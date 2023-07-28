import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useTokenListStyles = createUseStyles((theme: Theme) => ({
  addTokenButton: {
    "&:hover": {
      background: theme.palette.secondary.main,
    },
    background: theme.palette.white,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    minWidth: 120,
    padding: 8,
    position: "absolute",
    right: 10,
    top: 10,
  },
  centeredElement: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    textAlign: "center",
  },
  clearSearchButton: {
    "&:hover": {
      background: theme.palette.black,
    },
    alignItems: "center",
    background: theme.palette.secondary.dark,
    border: 0,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    height: 16,
    justifyContent: "center",
    padding: theme.spacing(0.5),
    transition: theme.hoverTransition,
    width: 16,
  },
  clearSearchButtonIcon: {
    "& rect": {
      fill: theme.palette.white,
      stroke: theme.palette.white,
      strokeWidth: 2,
    },
  },
  list: {
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.main,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
    height: "100%",
    overflowY: "auto",
  },
  searchIcon: {
    marginRight: theme.spacing(1.25),
  },
  searchInput: {
    backgroundColor: "transparent",
    border: 0,
    color: theme.palette.white,
    outline: 0,
    padding: [theme.spacing(2), 0],
    width: "100%",
  },
  searchInputContainer: {
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.secondary.light}`,

    display: "flex",
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  tokenBalance: {
    color: theme.palette.secondary.veryLight,
  },
  tokenBalanceWrapper: {
    marginLeft: "auto",
  },
  tokenButton: {
    "&:hover": {
      background: theme.palette.secondary.light,
    },
    alignItems: "center",
    background: theme.palette.secondary.main,
    border: "1px solid " + theme.palette.secondary.light,
    borderRadius: 8,
    cursor: "pointer",
    justifyContent: "space-between",
    overflow: "hidden",
    padding: theme.spacing(2),
    transition: theme.hoverTransition,
    width: "100%",
  },
  tokenButtonWrapper: {
    "&:not(:first-of-type)": {
      marginTop: theme.spacing(1),
    },
    position: "relative",
  },
  tokenIcon: {
    marginRight: theme.spacing(1),
  },
  tokenInfo: {
    alignItems: "center",
    display: "flex",
  },
  tokenInfoButton: {
    "&:hover": {
      background: theme.palette.secondary.main,
    },
    background: "transparent",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    height: 32,
    padding: 8,
    position: "absolute",
    right: theme.spacing(2),
    top: "50%",
    transform: "translateY(-50%)",
    width: 32,
  },
  tokenInfoButtonIcon: {
    "& path": {
      fill: theme.palette.secondary.veryLight,
    },
  },
  tokenInfoWithBalance: {
    alignItems: "center",
    display: "flex",
    marginRight: 48,
  },
  tokenList: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
}));
