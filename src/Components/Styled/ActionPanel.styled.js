import styled from "styled-components";

export const ActionPanel = styled.div`
  margin-top: 40px;
  height: 180px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  place-items: center;
  font-size: 1rem;
  gap: 10px;

  .signUp {
    background: ${({ theme }) => theme.foreground};
    width: 100%;
    border-radius: 10px;
    text-align: center;
    padding: 1rem;
  }

  .signIn {
    background: ${({ theme }) => theme.foreground};
    width: 100%;
    border-radius: 10px;
    text-align: center;
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;
