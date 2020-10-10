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
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    user-select: none;
 }

 input {
  font-family: 'Roboto', sans-serif;
 }

 li {
   color: ${({ theme }) => theme.text}
 }

 .tag {
   color: ${({ theme }) => theme.secondaryText};
 }

 main {
  position: relative;
 }


`;
