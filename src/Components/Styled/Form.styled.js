import styled from "styled-components";

export const Form = styled.div`
  position: fixed;
  min-height: 80px;
  bottom: 0px;
  height: 90px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  max-width: 675px;
  width: 95%;
  display: flex;
  place-items: center;
  background: ${({ theme }) => theme.background};

  form {
    background: ${({ theme }) => theme.foreground};
    border-radius: 10px;
    padding: 0.5rem;
    width: 100%;
    height: 70px;
    display: flex;
    place-items: center;
  }

  input {
    height: 100%;
    width: 85%;
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
    max-width: 80px;
    font-size: 2rem;
    background: ${({ theme }) => theme.button};
    border: none;
    border-radius: 50%;
  }
`;
