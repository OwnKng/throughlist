import styled from "styled-components";

export const HeaderBar = styled.header`
  top: 0px; 
  position: sticky;
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  margin: 0;
  justify-content: space-between;
  place-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border}
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
  background: ${({ theme }) => theme.foreground};
`;
