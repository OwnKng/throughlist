import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Tags = styled.div`
  margin: 20px auto;
  width: 100%;
  justify-self: end;

  p.active {
    font-weight: bold;
  }
`;

const Title = styled.h3`
  background-color: white;
  height: 70px;
  border: 2px solid rgb(50, 50, 50);
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 0px 50px;
  margin: 0px;
`;

const TagsList = ({ tags, activeTag, setActiveTag }) => {
  const togggleTags = (tag) => {
    tag === activeTag ? setActiveTag(false) : setActiveTag(tag);
  };

  const isActive = (tag) => {
    return tag === activeTag ? "active" : "";
  };

  return (
    <Tags>
      <Title>Tags</Title>
      {tags.length ? (
        tags.map((tag, i) => (
          <p
            key={i}
            className={`${isActive(tag)}`}
            onClick={() => togggleTags(tag)}
          >
            {tag}
          </p>
        ))
      ) : (
        <p>Add tags using #</p>
      )}
    </Tags>
  );
};

export default TagsList;
