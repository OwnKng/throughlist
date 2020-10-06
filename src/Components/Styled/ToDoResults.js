import styled from "styled-components";

export const ToDoResults = styled.div`
  background: ${({ theme }) => theme.foreground};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0px;
  overflow-y: scroll;
  height: 380px;
`;
