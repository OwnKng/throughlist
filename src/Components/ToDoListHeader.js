import React from "react";
import styled, { useTheme } from "styled-components";
import { BiCalendarAlt } from "react-icons/bi";
import { ListHeader } from "./Styled/ListHeader.styled";

const ToDoListHeader = ({ isSorted, sort = (f) => f }) => {
  const active = useTheme().iconActive;
  const inActive = useTheme().inActive;
  return (
    <ListHeader>
      <div className='title'>Tasks</div>
      <div className='sort'>
        sort
        <BiCalendarAlt
          onClick={sort}
          style={{
            marginLeft: 10,
            color: isSorted ? active : inActive,
          }}
        />
      </div>
    </ListHeader>
  );
};

export default ToDoListHeader;
