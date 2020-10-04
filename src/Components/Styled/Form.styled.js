import styled from "styled-components";

export const Form = styled.form`
  grid-area: input;
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.foreground};
  height: 70px;
  border-radius: 10px;

  align-self: end;
  justify-content: space-around;
  place-items: center;

  input {
    height: 90%;
    width: 80%;
    font-size: 1.5em;
    border: none;
    background: ${({ theme }) => theme.foreground};

    color: ${({ theme }) => theme.text};

    :focus {
      outline: none;
    }
  }

  button {
    color: rgb(50, 50, 50);
    font-size: 2rem;
    background: ${({ theme }) => theme.button};
    border: none;
    border-radius: 50%;
  }
`;
