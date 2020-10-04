import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tag } from "./Styled/Tag.styled";

const Tags = styled.div`
  width: 100%;
  min-height: 2rem;
  display: flex;
  flex-wrap: wrap;
  place-items: center;
  flex-basis: 1;
  gap: 5px;

  .title {
    text-transform: uppercase;
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
    <>
      <Tags>
        <span className='title'>Tags</span>
        {tags.length ? (
          tags.map((tag, i) => (
            <Tag className='tag' key={i}>
              <span
                onClick={() => togggleTags(tag)}
                className={`${isActive(tag)}`}
              >
                {tag}
              </span>
            </Tag>
          ))
        ) : (
          <span>Add tags using #</span>
        )}
      </Tags>
    </>
  );
};

export default TagsList;
