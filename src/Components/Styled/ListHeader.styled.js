import styled from "styled-components";

export const ListHeader = styled.div`
  display: flex;
  height: 3rem;
  width: 100%;
  place-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.foreground};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text};

  .title {
    font-weight: bold;
    font-size: 1rem;
  }

  .sort {
    font-size: 0.8rem;
  }
`;
