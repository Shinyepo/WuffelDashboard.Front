import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
      },
      html: {
        bg: "gray.900",
      }
    },
  },
  colors: {
    wuffel: "#f9cf93",
    nade: {
      100: "#1e1e2c",
      200: "#2f3142",
    },
    discord: "#5865F2",
  },
  fonts,
  breakpoints,
});

export default theme;
