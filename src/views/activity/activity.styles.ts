import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useActivityStyles = createUseStyles((theme: Theme) => ({
  bridgeCardwrapper: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: [0, theme.spacing(2)],
  },
  emptyMessage: {
    alignSelf: "center",
    color: theme.palette.white,
    maxWidth: theme.maxWidth,
    padding: [50, theme.spacing(2)],
    textAlign: "center",
    width: "100%",
    [theme.breakpoints.upSm]: {
      padding: 100,
    },
  },
  filterBox: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing(2),
    },
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    padding: [[theme.spacing(0.75), theme.spacing(1)]],
    transition: theme.hoverTransition,
  },
  filterBoxes: {
    display: "flex",
    margin: [theme.spacing(5), "auto", theme.spacing(2)],
    maxWidth: theme.maxWidth,
    width: "100%",
  },
  filterBoxLabel: {
    padding: [theme.spacing(0), theme.spacing(1)],
  },
  filterBoxSelected: {
    backgroundColor: theme.palette.secondary.main,
    border: "1px solid " + theme.palette.secondary.light,
    color: theme.palette.white,
  },
  filterNumberBox: {
    alignItems: "center",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 6,
    display: "flex",
    padding: [theme.spacing(0.25), theme.spacing(1)],
  },
  filterNumberBoxSelected: {
    backgroundColor: theme.palette.secondary.light,
  },
  stickyContent: {
    background: theme.palette.secondary.dark,
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  stickyContentBorder: {
    borderBottom: `${theme.palette.secondary.main} 1px solid`,
  },
}));
