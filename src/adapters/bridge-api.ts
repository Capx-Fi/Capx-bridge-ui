import axios from "axios";
import { z } from "zod";
import { BigNumber } from "ethers";

import { StrictSchema } from "src/utils/type-safety";
import * as domain from "src/domain";

interface Bridge {
  token_addr: string;
  amount: string;
  network_id: 0 | 1;
  orig_net: 0 | 1;
  dest_net: 0 | 1;
  dest_addr: string;
  deposit_cnt: string;
}

interface Claim {
  index: string;
  block_num: string;
}

interface MerkleProof {
  merkle_proof: string[];
  exit_root_num: string;
  main_exit_root: string;
  rollup_exit_root: string;
}

const apiBridgeToDomain = ({
  token_addr,
  amount,
  network_id,
  orig_net,
  dest_net,
  dest_addr,
  deposit_cnt,
}: Bridge): domain.Bridge => ({
  tokenAddress: token_addr,
  amount: BigNumber.from(amount),
  networkId: network_id,
  originNetwork: orig_net,
  destinationNetwork: dest_net,
  destinationAddress: dest_addr,
  depositCount: z.number().nonnegative().parse(Number(deposit_cnt)),
});

const bridgeParser = StrictSchema<Bridge, domain.Bridge>()(
  z
    .object({
      token_addr: z.string(),
      amount: z.string(),
      network_id: z.union([z.literal(0), z.literal(1)]),
      orig_net: z.union([z.literal(0), z.literal(1)]),
      dest_net: z.union([z.literal(0), z.literal(1)]),
      dest_addr: z.string(),
      deposit_cnt: z.string(),
    })
    .transform(apiBridgeToDomain)
);

const getBridgesResponseParser = StrictSchema<
  {
    deposits?: Bridge[];
  },
  {
    deposits?: domain.Bridge[];
  }
>()(
  z.object({
    deposits: z.optional(z.array(bridgeParser)),
  })
);

const getClaimStatusResponseParser = StrictSchema<{
  ready?: boolean;
}>()(
  z.object({
    ready: z.optional(z.boolean()),
  })
);

const apiMerkleProofToDomain = ({
  merkle_proof,
  exit_root_num,
  main_exit_root,
  rollup_exit_root,
}: MerkleProof): domain.MerkleProof => ({
  merkleProof: merkle_proof,
  exitRootNumber: z.number().nonnegative().parse(Number(exit_root_num)),
  mainExitRoot: main_exit_root,
  rollupExitRoot: rollup_exit_root,
});

const merkleProofParser = StrictSchema<MerkleProof, domain.MerkleProof>()(
  z
    .object({
      merkle_proof: z.array(z.string().length(66)),
      exit_root_num: z.string(),
      main_exit_root: z.string().length(66),
      rollup_exit_root: z.string().length(66),
    })
    .transform(apiMerkleProofToDomain)
);

const getMerkleProofResponseParser = StrictSchema<
  {
    proof: MerkleProof;
  },
  {
    proof: domain.MerkleProof;
  }
>()(
  z.object({
    proof: merkleProofParser,
  })
);

const apiClaimToDomain = ({ index, block_num }: Claim): domain.Claim => ({
  index: z.number().nonnegative().parse(Number(index)),
  blockNumber: block_num,
});

const claimParser = StrictSchema<Claim, domain.Claim>()(
  z
    .object({
      index: z.string(),
      block_num: z.string(),
    })
    .transform(apiClaimToDomain)
);

const getClaimsResponseParser = StrictSchema<
  {
    claims?: Claim[];
  },
  {
    claims?: domain.Claim[];
  }
>()(
  z.object({
    claims: z.optional(z.array(claimParser)),
  })
);

interface GetTransactionsParams {
  env: domain.Env;
  ethereumAddress: string;
}

const getTransactions = async ({
  env,
  ethereumAddress,
}: GetTransactionsParams): Promise<domain.Transaction[]> => {
  const apiUrl = env.bridge.apiUrl;
  const [bridges, claims] = await Promise.all([
    getBridges({ apiUrl, ethereumAddress }),
    getClaims({ apiUrl, ethereumAddress }),
  ]);

  return await Promise.all(
    bridges.map(async (bridge): Promise<domain.Transaction> => {
      const {
        originNetwork,
        destinationNetwork,
        networkId,
        amount,
        destinationAddress,
        depositCount,
      } = bridge;
      const [claimStatus, merkleProof]: [domain.ClaimStatus, domain.MerkleProof] =
        await Promise.all([
          getClaimStatus({ apiUrl, networkId, depositCount }),
          getMerkleProof({ apiUrl, networkId, depositCount }),
        ]);
      const initiatedTransaction: domain.InitiatedTransaction = {
        token: env.tokens.ETH,
        originNetwork: env.chains[originNetwork],
        destinationNetwork: env.chains[destinationNetwork],
        networkId,
        amount,
        destinationAddress,
        depositCount,
      };
      if (claimStatus.isReady) {
        const claim = claims.find((claim) => claim.index === bridge.depositCount);
        return claim
          ? {
              ...initiatedTransaction,
              ...merkleProof,
              index: claim.index,
              blockNumber: claim.blockNumber,
              status: "completed",
            }
          : {
              ...initiatedTransaction,
              ...merkleProof,
              status: "on-hold",
            };
      } else {
        return {
          ...initiatedTransaction,
          status: "initiated",
        };
      }
    })
  );
};

interface GetBridgesParams {
  apiUrl: string;
  ethereumAddress: string;
}

const getBridges = ({ apiUrl, ethereumAddress }: GetBridgesParams): Promise<domain.Bridge[]> => {
  return axios
    .request({
      baseURL: apiUrl,
      url: `/bridges/${ethereumAddress}`,
      method: "GET",
    })
    .then((res) => {
      const parsedData = getBridgesResponseParser.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data.deposits !== undefined ? parsedData.data.deposits : [];
      } else {
        throw parsedData.error;
      }
    });
};

interface GetClaimStatusParams {
  apiUrl: string;
  networkId: number;
  depositCount: number;
}

const getClaimStatus = ({
  apiUrl,
  networkId,
  depositCount,
}: GetClaimStatusParams): Promise<domain.ClaimStatus> => {
  return axios
    .request({
      baseURL: apiUrl,
      url: `/claim-status`,
      method: "GET",
      params: {
        net_id: networkId,
        deposit_cnt: depositCount,
      },
    })
    .then((res) => {
      const parsedData = getClaimStatusResponseParser.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data.ready === true ? { isReady: true } : { isReady: false };
      } else {
        throw parsedData.error;
      }
    });
};

interface GetMerkleProofParams {
  apiUrl: string;
  networkId: number;
  depositCount: number;
}

const getMerkleProof = ({
  apiUrl,
  networkId,
  depositCount,
}: GetMerkleProofParams): Promise<domain.MerkleProof> => {
  return axios
    .request({
      baseURL: apiUrl,
      url: `/merkle-proofs`,
      method: "GET",
      params: {
        net_id: networkId,
        deposit_cnt: depositCount,
      },
    })
    .then((res) => {
      const parsedData = getMerkleProofResponseParser.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data.proof;
      } else {
        throw parsedData.error;
      }
    });
};

interface GetClaimsParams {
  apiUrl: string;
  ethereumAddress: string;
}

const getClaims = ({ apiUrl, ethereumAddress }: GetClaimsParams): Promise<domain.Claim[]> => {
  return axios
    .request({
      baseURL: apiUrl,
      url: `/claims/${ethereumAddress}`,
      method: "GET",
    })
    .then((res) => {
      const parsedData = getClaimsResponseParser.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data.claims !== undefined ? parsedData.data.claims : [];
      } else {
        throw parsedData.error;
      }
    });
};

export { getTransactions };
