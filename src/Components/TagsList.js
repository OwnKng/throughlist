import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Tags = styled.div`
  min-width: 300px;
  align-items: flex-start;

  p.active {
    font-weight: bold;
  }
`;

const Title = styled.div`
  display: flex;
  border-bottom: 2px solid rgb(50, 50, 50);
  background-color: rgb(255, 255, 255);

  h3 {
    margin: 66px 0px 0px 0px;
    padding-left: 10px;
  }
`;

const Tag = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(222, 222, 222);
  background-color: white;
  place-items: center;

  p {
    margin: 0px;
    padding: 10px 0px 10px 10px;
    font-size: 1rem;
  }

  p.active {
    font-weight: bold;
  }
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
      <Title>
        <h3>Tags</h3>
      </Title>
      {tags.length ? (
        tags.map((tag, i) => (
          <Tag key={i} onClick={() => togggleTags(tag)}>
            <p className={`${isActive(tag)}`}>{tag}</p>
          </Tag>
        ))
      ) : (
        <p>Add tags using #</p>
      )}
    </Tags>
  );
};

export default TagsList;
