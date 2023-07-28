export const theme = {
  breakpoints: {
    upSm: "@media (min-width: 480px)",
  },
  hoverTransition: "all 150ms",
  maxWidth: 644,
  palette: {
    black: "#0a0b0d",
    error: {
      light: "rgba(232,67,12,0.1)",
      main: "#e8430d",
    },
    primary: {
      dark: "#8dbc1a",
      main: "#c9fe36",
    },
    secondary: {
      dark: "#0C0E12",
      light: "#292d32",
      main: "#171916",
      veryLight: "#4d4d4d",
    },
    success: {
      light: "rgba(0,255,0,0.1)",
      main: "#1ccc8d",
    },
    transparency: "rgba(8,17,50,0.5)",
    warning: {
      light: "rgba(225,126,38,0.1)",
      main: "#e17e26",
    },
    white: "#ffffff",
  },
  spacing: (value: number): number => value * 8,
};

export type Theme = typeof theme;
