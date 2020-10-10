import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDarkMode } from "./ThemeProvider";
import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Nav = styled.nav`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
    margin-left: 30px;
  }
`;

const NavList = styled.ul`
  text-align: right;
  list-style: none;
  line-height: 2;

  svg {
    font-size: 1.2rem;
  }
`;

const Navigation = () => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  let history = useHistory();

  const { theme, toggleTheme } = useDarkMode();

  return (
    <Nav>
      <NavList>
        <li onClick={() => toggleTheme()}>
          {theme === "light" ? <BsMoon /> : <BsSun />}
        </li>
        {data.isLoggedIn ? (
          <li
            onClick={() => {
              localStorage.removeItem("token");
              client.watchQuery({
                query: IS_LOGGED_IN,
                data: { isLoggedIn: false },
              });
              history.push("/");
              history.go();
            }}
          >
            Log out
          </li>
        ) : (
          <div />
        )}
      </NavList>
    </Nav>
  );
};

export default Navigation;
