import React from "react";
import Navigation from "./Navigation";
import Header from "./Header";
import styled from "styled-components";

const Wrapper = styled.div`
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 120px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  @media (max-width: 700px) {
    margin-top: 64px;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>
        <Main>{children}</Main>
      </Wrapper>
    </>
  );
};

export default Layout;

// <Navigation />
