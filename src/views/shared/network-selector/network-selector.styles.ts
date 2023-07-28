import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useNetworkSelectorStyles = createUseStyles((theme: Theme) => ({
  networkButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    alignItems: "center",
    background: theme.palette.secondary.main,
    border: "1px solid " + theme.palette.secondary.light,
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    gap: theme.spacing(1),
    justifyContent: "space-between",
    maxWidth: 200,
    padding: theme.spacing(1.25),
    transition: theme.hoverTransition,
  },
  networkButtonText: {
    display: "none",
    fontSize: "14px !important",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    [theme.breakpoints.upSm]: {
      display: "block",
    },
  },
}));
