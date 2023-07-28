import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useListStyles = createUseStyles((theme: Theme) => ({
  background: {
    alignItems: "center",
    backdropFilter: "blur(3px)",
    background: "rgba(10,11,13, 0.07)",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    padding: [0, theme.spacing(1)],
    width: "100%",
  },
  button: {
    "&:hover": {
      background: theme.palette.secondary.light,
    },
    "&:not(:first-of-type)": {
      marginTop: theme.spacing(1),
    },
    alignItems: "center",
    background: theme.palette.secondary.main,
    border: "1px solid " + theme.palette.secondary.light,
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    transition: theme.hoverTransition,
  },
  card: {
    backgroundColor: theme.palette.secondary.main,
    border: "1px solid " + theme.palette.secondary.light,
    maxWidth: 426,
    padding: theme.spacing(2),
    width: "100%",
  },
  closeButton: {
    "&:hover": {
      background: theme.palette.secondary.veryLight,
    },
    alignItems: "center",
    background: theme.palette.secondary.light,
    border: 0,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    height: theme.spacing(4),
    justifyContent: "center",
    padding: 0,
    position: "absolute",
    right: 0,
    transition: theme.hoverTransition,
    width: theme.spacing(4),
  },
  closeButtonIcon: {
    height: 16,
    width: 16,
  },
  header: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    padding: [theme.spacing(0.5), 0],
    position: "relative",
  },
  icon: {
    height: "24px",
    width: "24px",
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
    display: "flex",
    flexDirection: "column",
    maxHeight: 270,
    overflowY: "auto",
  },
}));
