import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useConfirmationModalStyles = createUseStyles((theme: Theme) => ({
  background: {
    alignItems: "center",
    backdropFilter: "blur(3px)",
    backgroundColor: `rgba(10,11,13, 0.07)`,
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.upSm]: {
      alignItems: "flex-start",
    },
  },
  cancelButton: {
    "&:hover": {
      color: theme.palette.black,
    },
    background: "transparent",
    border: 0,
    color: theme.palette.secondary.dark,
    cursor: "pointer",
    margin: [theme.spacing(1), "auto", theme.spacing(-1), "auto"],
    padding: theme.spacing(1),
    transition: theme.hoverTransition,
  },
  card: {
    backgroundColor: theme.palette.secondary.main,
    border: "1px solid " + theme.palette.secondary.light,
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: 510,
    padding: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.upSm]: {
      marginTop: theme.spacing(30),
      padding: theme.spacing(4),
    },
  },
  textContainer: {
    "& p": {
      lineHeight: "24px",
      textAlign: "center",
    },
    margin: [theme.spacing(3), 0, [theme.spacing(4)]],
  },
  title: {
    color: theme.palette.white + " !importent",
    textAlign: "center",
  },
}));
