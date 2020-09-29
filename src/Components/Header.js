import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  margin: 0px;
  align-items: center;
  border-bottom: 1px solid white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
  background-color: rgb(255, 255, 255);
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
  color: rgb(50, 50, 50);
`;

const Header = () => {
  return (
    <HeaderBar>
      <LogoText>To Do</LogoText>
      <Navigation />
    </HeaderBar>
  );
};

export default Header;
