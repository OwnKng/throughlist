import styled from "styled-components";

export const Button = styled.button`
  display: block;
  border-radius: 15px;
  font-size: 1.1rem;
  margin: 20px auto;
  border: 1px solid ${({ theme }) => theme.secondaryText};
  background: none;
  padding: 10px;
  font-family: "Roboto", sans-serif;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.secondaryText};
  }
`;
