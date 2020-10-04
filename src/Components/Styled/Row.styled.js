import styled from "styled-components";
import { motion } from "framer-motion";

export const Row = styled(motion.div)`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.foreground};

  :hover {
    background-color: ${({ theme }) => theme.hover};
  }

  display: grid;
  grid-template-columns: 1fr 4fr 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  text-align: left;
  align-items: center;
  grid-col-gap: 5px;

  .cal {
    font-size: 1rem;
    color: ${({ theme }) => theme.inActive};
  }

  .cal:hover {
    color: ${({ theme }) => theme.iconActive};
  }
`;
