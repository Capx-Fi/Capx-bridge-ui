import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useNetworkBoxStyles = createUseStyles((theme: Theme) => ({
  button: {
    "&:disabled": {
      cursor: "inherit",
      opacity: 0.75,
    },
    "&:hover:not(:disabled)": {
      background: theme.palette.secondary.light,
    },
    alignItems: "center",
    appearance: "none",
    background: theme.palette.secondary.dark,
    border: "1px solid " + theme.palette.secondary.light,
    borderRadius: 8,
    color: theme.palette.white,
    cursor: "pointer",
    display: "flex",
    padding: [theme.spacing(1), theme.spacing(1.5)],
    transition: theme.hoverTransition,
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    width: 20,
  },
  buttons: {
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(4),
    textAlign: "center",
  },
  link: {
    color: theme.palette.primary.dark,
  },
  list: {
    paddingLeft: theme.spacing(2),
    width: "100%",
    wordBreak: "break-word",
  },
  listItem: {
    padding: [theme.spacing(0.25), 0],
  },
  networkBox: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
}));
