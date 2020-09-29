import React from "react";
import { Link } from "react-router-dom";
import { useApolloClient, gql, useQuery } from "@apollo/client";
import ToDos from "../Components/ToDos.js";

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Home = () => {
  const client = useApolloClient();
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <>
      {data.isLoggedIn ? (
        <ToDos />
      ) : (
        <>
          <h1>Welcome to To Do</h1>
          <h3>Productivity, here we come....</h3>
          <Link to='/signin'>Please sign in to view your tasks</Link>
          <p>
            New to To Do? <Link to='/signup'>Sign up</Link>{" "}
          </p>
        </>
      )}
    </>
  );
};

export default Home;
