import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useCardStyles = createUseStyles((theme: Theme) => ({
  card: {
    background: theme.palette.secondary.main,
    border: "1px solid " + theme.palette.secondary.light,
    borderRadius: 16,
    overflow: "hidden",
  },
}));
