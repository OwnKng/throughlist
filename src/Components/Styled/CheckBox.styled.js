import styled from "styled-components";

export const Checkbox = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: -1;

  svg {
    opacity: 0;
    font-size: 2rem;
  }

  svg:hover {
    opacity: 1;
  }
`;
