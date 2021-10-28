import { createGlobalStyle } from "styled-components";
import { baseFontSize } from "./style-variables";

export const GlobalStyle = createGlobalStyle`
body {
  font-size: ${baseFontSize} !important;
}
`;

export default GlobalStyle;
