import { useState, FC, useEffect } from "react";

import TransactionCard from "src/views/activity/components/transaction-card/transaction-card.view";
import useActivityStyles from "src/views/activity/activity.styles";
import Typography from "src/views/shared/typography/typography.view";
import Header from "src/views/shared/header/header.view";
import { useBridgeContext } from "src/contexts/bridge.context";
import { useProvidersContext } from "src/contexts/providers.context";
import { useUIContext } from "src/contexts/ui.context";
import { parseError } from "src/adapters/error";
import { isMetamaskUserRejectedRequestError } from "src/utils/types";
import { Transaction } from "src/domain";

const Activity: FC = () => {
  const { getTransactions, claim } = useBridgeContext();
  const { account } = useProvidersContext();
  const { openSnackbar } = useUIContext();
  const [transactionList, setTransactionsList] = useState<Transaction[]>([]);
  const [displayAll, setDisplayAll] = useState(true);
  const classes = useActivityStyles({ displayAll });

  const onDisplayAll = () => setDisplayAll(true);
  const onDisplayPending = () => setDisplayAll(false);

  const onClaim = (tx: Transaction) => {
    if (tx.status === "on-hold") {
      void claim(
        tx.token.address,
        tx.amount,
        tx.originNetwork.networkId.toString(),
        tx.destinationNetwork.networkId,
        tx.destinationAddress,
        tx.merkleProof,
        tx.exitRootNumber,
        tx.mainExitRoot,
        tx.rollupExitRoot
      ).catch((error) => {
        if (isMetamaskUserRejectedRequestError(error) === false) {
          void parseError(error).then((parsed) => {
            openSnackbar({
              type: "error",
              parsed,
            });
          });
        }
      });
    }
  };

  useEffect(() => {
    if (account.status === "successful") {
      void getTransactions({ ethereumAddress: account.data })
        .then((transactions) => {
          setTransactionsList(transactions);
        })
        .catch((error) => {
          void parseError(error).then((parsed) => {
            openSnackbar({
              type: "error",
              parsed,
            });
          });
        });
    }
  }, [account, getTransactions, openSnackbar]);

  const pendingTransactions = transactionList.filter((data) => data.status !== "completed");
  const filteredList = displayAll ? transactionList : pendingTransactions;

  return (
    <>
      <Header title="Activity" backTo="home" />
      <div className={classes.selectorBoxes}>
        <div className={`${classes.selectorBox} ${classes.allBox}`} onClick={onDisplayAll}>
          <Typography type="body1" className={classes.status}>
            All
          </Typography>
          <Typography type="body2" className={classes.numberAllBox}>
            {transactionList.length}
          </Typography>
        </div>
        <div className={`${classes.selectorBox} ${classes.pendingBox}`} onClick={onDisplayPending}>
          <Typography type="body1" className={classes.status}>
            Pending
          </Typography>
          <Typography type="body2" className={classes.numberPendingBox}>
            {pendingTransactions.length}
          </Typography>
        </div>
      </div>
      {filteredList.map((transaction) => (
        <TransactionCard
          transaction={transaction}
          onClaim={() => onClaim(transaction)}
          key={`${transaction.destinationNetwork.networkId}-${transaction.depositCount}`}
        />
      ))}
    </>
  );
};

export default Activity;
