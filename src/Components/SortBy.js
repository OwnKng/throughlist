import React from "react";
import styled from "styled-components";
import { BiCalendarAlt } from "react-icons/bi";

const SortBy = ({ isSorted, sort = (f) => f }) => {
  const SortByOptions = styled.div`
    padding-right: 5px;
    height: 20px;
    background-color: white;
    width: 100%;
    text-align: right;
    place-items: center;

    span {
      padding-right: 15px;
    }

    svg {
      color: ${isSorted ? "rgb(0,0,0)" : "rgb(222, 222, 222)"};
    }

    :hover svg {
      color: rgb(100, 100, 100);
    }
  `;

  return (
    <SortByOptions onClick={sort}>
      <span>sort</span>
      <BiCalendarAlt />
    </SortByOptions>
  );
};

export default SortBy;
