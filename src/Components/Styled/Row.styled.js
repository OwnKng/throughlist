import styled from "styled-components";
import { motion } from "framer-motion";

export const Row = styled(motion.div)`
  width: 100%;
  padding: 0.5rem;
  background: ${({ theme }) => theme.foreground};

  :hover {
    background-color: ${({ theme }) => theme.hover};
  }

  display: grid;
  grid-template-columns: 1fr 4fr 0.5fr 0.5fr;
  grid-template-rows: 1fr 1fr 1fr;
  text-align: left;
  align-items: center;

  .cal {
    color: ${({ theme }) => theme.inActive};
  }

  .cal:hover {
    color: ${({ theme }) => theme.iconActive};
  }
`;

export const DueDate = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.teritaryText};
  grid-column-start: 2;
  grid-column-end: -1;
  grid-row-start: 2;
  grid-row-end: 2;
  align-self: center;
  margin-left: 3px;
`;
