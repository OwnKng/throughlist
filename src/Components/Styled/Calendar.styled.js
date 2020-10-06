import styled from "styled-components";
import { motion } from "framer-motion";

export const Cal = styled(motion.div)`
  width: 90%;
  max-width: 400px;
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  background-color: ${({ theme }) => theme.foreground};
  border: 1px solid ${({ theme }) => theme.border};
  overflow: hidden;
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
`;

export const Title = styled.div`
  display: grid;
  font-size: 1.5rem;
  justify-items: center;
  background: ${({ theme }) => theme.foreground};
`;

export const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-around;
  justify-items: center;
  font-size: 1.1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  border-top: 1px solid ${({ theme }) => theme.border};
  align-items: center;

  .today {
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: center;
    width: 100%;
    font-size: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  .today:hover {
    background: ${({ theme }) => theme.hover};
  }

  .tomorrow {
    grid-column-start: 3;
    grid-column-end: 5;
    text-align: center;
    width: 100%;
    font-size: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    border-left: 1px solid ${({ theme }) => theme.border};
  }

  .tomorrow:hover {
    background: ${({ theme }) => theme.hover};
  }

  svg {
    border-left: 1px solid ${({ theme }) => theme.border};
    border-right: 1px solid ${({ theme }) => theme.border};
    font-size: 1.5rem;
  }

  svg:hover {
    background: ${({ theme }) => theme.hover};
  }
`;
