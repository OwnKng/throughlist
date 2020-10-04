import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import { HeaderBar } from "./Styled/HeaderBar.styled";
import { LogoText } from "./Styled/LogoText.styled";

const Header = () => {
  return (
    <HeaderBar>
      <LogoText>Throughlist</LogoText>
      <Navigation />
    </HeaderBar>
  );
};

export default Header;
