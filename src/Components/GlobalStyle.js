import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

html, body {
    margin: 0;
    padding: 0;
    max-height: 100vh;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
 }

 input {
  font-family: 'Roboto', sans-serif;
 }

 li {
   color: ${({ theme }) => theme.text}
 }

 li:hover {
  color: ${({ theme }) => theme.textHover}
 }

 .tag {
   color: ${({ theme }) => theme.secondaryText};
 }


`;
