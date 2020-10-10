import React from "react";
import Navigation from "./Navigation";
import { HeaderBar } from "./Styled/HeaderBar.styled";
import { LogoText } from "./Styled/LogoText.styled";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderBar>
      <Link to='/' style={{ textDecoration: "none" }}>
        <LogoText>Throughlist</LogoText>
      </Link>
      <Navigation />
    </HeaderBar>
  );
};

export default Header;
