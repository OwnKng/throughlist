import styled from "styled-components";

export const SignInForm = styled.div`
  max-width: 720px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  background-color: ${({ theme }) => theme.foreground};
  padding: 20px 20px 80px 20px;

  form {
    width: 100%;
  }

  h2 {
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-size: 1.2rem;
  }

  input {
    display: block;
    margin: 0px 0px 30px 0px;
    width: 100%;
    height: 60px;
    font-size: 1.25rem;
    color: white;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.foreground};

    color: ${({ theme }) => theme.text};

    :focus {
      outline: none;
    }
  }

  .error {
    display: block;
    font-size: 1.2rem;
    padding: 10px 0px;
    color: ${({ theme }) => theme.urgent};
  }

  button {
    border-radius: 15px;
    height: 40px;
    border: none;
    color: black;
    padding: 0px 10px;
    text-align: center;
    background: none;
    border: 1px solid ${({ theme }) => theme.secondaryText};
    color: ${({ theme }) => theme.secondaryText};
  }
`;
