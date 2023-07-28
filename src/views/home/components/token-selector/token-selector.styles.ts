import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useTokenSelectorStyles = createUseStyles((theme: Theme) => ({
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
  card: {
    display: "flex",
    flexDirection: "column",
    height: 515,
    maxWidth: 500,
    padding: theme.spacing(2),
    width: "100%",
  },
}));
