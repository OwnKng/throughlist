import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { BiCalendarAlt } from "react-icons/bi";
import { FaExclamation } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Row } from "./Styled/Row.styled";
import { Checkbox } from "./Styled/CheckBox.styled";

const Desc = styled.div`
  font-size: 0.8rem;
  margin-left: 3px;
  padding: 0px;
  text-transform: capitalize;
  align-self: end;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
`;

const DueDate = styled.div`
  font-size: 0.8rem;
  grid-column-start: 2;
  grid-column-end: -1;
  grid-row-start: 3;
  grid-row-end: 3;
  align-self: center;
  margin-left: 3px;
`;

const Tags = styled.div`
  display: flex;
  text-align: center;
  font-size: 0.8rem;

  grid-column-start: 2;
  grid-column-end: -1;
  grid-row-start: 2;
  grid-row-end: 2;
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
  font-size: 1rem;
`;

const MarkUrgent = styled.div`
  grid-column-start: 4;
  grid-column-end: -1;
  grid-row-start: 1;
  grid-row-end: 1;
  justify-self: end;
  font-size: 1rem;
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

  return toDos.map((toDo) => {
    return (
      <AnimatePresence key={toDo.id}>
        <Row
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
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
