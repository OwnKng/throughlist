import React from "react";
import Navigation from "./Navigation";
import Header from "./Header";
import styled from "styled-components";

const Wrapper = styled.div``;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
    </Wrapper>
  );
};

export default Layout;

// <Navigation />
