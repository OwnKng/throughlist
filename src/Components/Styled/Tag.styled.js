import styled from "styled-components";

export const Tag = styled.div`
  background: ${({ theme }) => theme.foreground};
  place-items: center;
  margin: 10px;
  padding: 3px;
  border-radius: 5px;

  span {
    padding: 5px;
  }

  span.active {
    font-weight: bold;
  }
`;
