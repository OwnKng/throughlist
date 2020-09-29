import React, { useState } from "react";
import styled from "styled-components";
import { MdDone } from "react-icons/md";
import { useTransition, animated } from "react-spring";
import DateForm from "./DateForm";
import { BiCalendarAlt } from "react-icons/bi";
import { FaExclamation } from "react-icons/fa";

const Row = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgb(222, 222, 222);
  background-color: rgb(255, 255, 255);
  position: relative;

  :hover {
    background-color: rgb(250, 250, 250);
  }

  display: grid;
  grid-template: 1fr / 1fr 6fr 2fr 2fr 1fr 0.5fr;
  text-align: left;
  align-items: center;
  color: rgb(50, 50, 50);
  grid-gap: 5px;

  .cal {
    font-size: 1.25rem;
    color: rgb(222, 222, 222);
  }

  .cal:hover {
    color: rgb(50, 50, 50);
  }
`;

const Checkbox = styled.div`
  border: 1px solid rgb(50, 50, 50);
  margin-left: 10px;
  text-align: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;

  svg {
    opacity: 0;
    font-size: 2rem;
  }

  svg:hover {
    opacity: 1;
  }
`;

const Desc = styled.div`
  font-size: 1rem;
  align-items: center;
  margin: 0px;
  margin-left: 0px;
  padding: 0px;
`;

const DueDate = styled.div`
  text-align: center;
  font-size: 0.8rem;
`;

const Tags = styled.div`
  display: grid;
  width: 100%;
  grid-auto-flow: column;
  font-size: 0.8rem;
  color: #1cacf4;
`;

const MarkUrgent = styled.div``;

const ToDoList = ({ toDos, completeToDo, addDate, toggleUrgent }) => {
  const [active, setActive] = useState();

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

  const renderDateMenu = (id) => {
    if (id === active)
      return (
        <DateForm addDate={addDate} setActive={setActive} itemId={active} />
      );
  };

  return toDos.map((toDo, i) => {
    return (
      <Row key={i}>
        <Checkbox>
          <MdDone
            onClick={() => {
              completeToDo({
                variables: {
                  id: toDo.id,
                },
              });
            }}
          />
        </Checkbox>
        <Desc>{toDo.desc}</Desc>
        <Tags>
          {toDo.tags.map((tag, i) => (
            <p key={i}>{tag}</p>
          ))}
        </Tags>
        <DueDate>{formatDate(toDo.dueDate)}</DueDate>
        <div
          onClick={() => {
            setActive(toDo.id);
          }}
        >
          <BiCalendarAlt className='cal' />
        </div>
        {renderDateMenu(toDo.id)}
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
              color: toDo.urgent ? "rgb(255, 56, 56)" : "rgb(222, 222, 222)",
            }}
          />
        </MarkUrgent>
      </Row>
    );
  });
};

export default ToDoList;
