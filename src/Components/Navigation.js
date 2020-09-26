import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Nav = styled.nav`
padding: 1em; 
background-color: rgb(255, 255, 255);
@media (max-width: 700px) {
  padding-top 64px;
}

@media (min-width: 700px) {
  position: fixed;
  width: 220px;
  height: calc(100% - 64px);
  overflow-y: scroll;
};
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;

  a {
    text-decoration: none;
    font-size: 1.1em;
    color: rgb(50, 50, 50);
  }

  a:visited {
    color: rgb(50, 50, 50);
  }

  a:hover,
  a:focus {
    color: #0077cc;
  }

  p {
    text-decoration: none;
    font-size: 1.1em;
    color: rgb(50, 50, 50);
  }

  p:hover,
  p:focus {
    color: #0077cc;
  }
`;

const Navigation = () => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  let history = useHistory();

  return (
    <Nav>
      <NavList>
        <li>
          <Link to='/todos'>To Dos</Link>
        </li>
        <li>
          <Link to='/completed'>Completed</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
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
            <p>Log out</p>
          </li>
        ) : (
          <div />
        )}
      </NavList>
    </Nav>
  );
};

export default Navigation;
