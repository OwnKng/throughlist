import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

html, body {
    margin: 0;
    padding: 0;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  body {
    background-color: rgb(247, 247, 247);
    color: rgb(0, 0, 0);
    font-family: 'Roboto', sans-serif;
 }

 input {
  font-family: 'Roboto', sans-serif;
 }

`;
