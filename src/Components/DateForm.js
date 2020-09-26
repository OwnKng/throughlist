import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import useDate from "../Hooks/hooks";
import { useActive } from "./ActiveProvider";
import { animated, useSprings } from "react-spring";

const MenuItem = styled(animated.div)`
  position: absolute;
  top: 80px;
  right: 0px;
  z-index: 2;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(222, 222, 222);
`;

const Item = styled.div`
  padding: 10px 15px;
  align-items: center;
  border-bottom: 1px solid rgb(222, 222, 222);
  :hover {
    background-color: rgb(250, 250, 250);
  }
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid rgb(222, 222, 222);
  color: rgb(50, 50, 50);

  :focus {
    outline: none;
  }
`;

const DateMenu = ({ addDate, itemId, setActive }) => {
  const [today, tomorrow] = useDate();
  const [date, setDate] = useState();

  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setActive({});
  };

  return (
    <MenuItem ref={node}>
      <Item
        onClick={(e) => {
          addDate({
            variables: {
              id: itemId,
              date: today,
            },
          });
          setActive({});
        }}
      >
        Today
      </Item>
      <Item
        onClick={(e) => {
          addDate({
            variables: {
              id: itemId,
              date: tomorrow,
            },
          });
          setActive({});
        }}
      >
        Tomorrow
      </Item>
      <Input
        type='date'
        name='date'
        value={date}
        onChange={(e) => {
          addDate({
            variables: {
              id: itemId,
              date: e.target.value,
            },
          });
          setDate(e.target.value);
        }}
        placeholder='Add tag'
      />
    </MenuItem>
  );
};

export default DateMenu;

/*



*/
