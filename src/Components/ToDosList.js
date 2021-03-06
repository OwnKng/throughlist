import React from "react";
import styled, { useTheme } from "styled-components";
import { BiCalendarAlt } from "react-icons/bi";
import { FaExclamation } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { Row, DueDate } from "./Styled/Row.styled";
import { Checkbox } from "./Styled/CheckBox.styled";

const Desc = styled.div`
  font-size: 1rem;
  margin-left: 3px;
  padding: 0px;
  text-transform: capitalize;
  align-self: end;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
`;

const Tags = styled.div`
  display: flex;
  text-align: center;
  font-size: 1rem;

  grid-column-start: 2;
  grid-column-end: -1;
  grid-row-start: 3;
  grid-row-end: 3;
  align-self: center;

  span {
    margin: 0px;
    margin-left: 3px;
  }
`;

const Cal = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
  align-self: end;
  justify-self: end;
  font-size: 1.1rem;
`;

const MarkUrgent = styled.div`
  grid-column-start: 4;
  grid-column-end: -1;
  grid-row-start: 1;
  grid-row-end: 1;
  justify-self: end;
  font-size: 1.1rem;
`;

const ToDoList = (
  { toDos, completeToDo, toggleDate, toggleUrgent, setActive },
  props
) => {
  const formatDate = (date) => {
    if (!date) return "";

    date = new Date(date);

    let options = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleString("en-GB", options);
  };

  const urgent = useTheme().urgent;
  const inActive = useTheme().inActive;

  const animation = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
    },
    exit: {
      height: 0,
      opacity: 0,
    },
  };

  return toDos.map((toDo) => {
    return (
      <AnimatePresence key={toDo.id}>
        <Row
          variants={animation}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <Checkbox
            onClick={() => {
              completeToDo({
                variables: {
                  id: toDo.id,
                },
              });
            }}
          ></Checkbox>
          <Desc>{toDo.desc}</Desc>
          <Cal
            onClick={() => {
              setActive(toDo.id);
              toggleDate();
            }}
          >
            <BiCalendarAlt className='cal' />
          </Cal>
          <MarkUrgent
            onClick={() => {
              toggleUrgent({
                variables: {
                  id: toDo.id,
                },
              });
            }}
          >
            <FaExclamation
              style={{
                color: toDo.urgent ? urgent : inActive,
              }}
            />
          </MarkUrgent>
          <Tags className='tag'>
            {toDo.tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </Tags>
          <DueDate>{formatDate(toDo.dueDate)}</DueDate>
        </Row>
      </AnimatePresence>
    );
  });
};

export default ToDoList;
