import { extendTheme, theme as baseTheme } from "@chakra-ui/react" 

import * as foundations from "./foundations";

export const theme: Record<string, any> = extendTheme({
    ...foundations,
  colors: {
    ...baseTheme.colors,
    brand: {
      "50": "#FFE5E5",
      "100": "#FFB8B8",
      "200": "#FF8A8A",
      "300": "#FF5C5C",
      "400": "#FF2E2E",
      "500": "#FF0000",
      "600": "#CC0000",
      "700": "#990000",
      "800": "#660000",
      "900": "#330000",
    },
  },
  space: {
    "4.5": "1.125rem",
  },
});