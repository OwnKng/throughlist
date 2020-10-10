import React from "react";
import { Link } from "react-router-dom";
import { useApolloClient, gql, useQuery, useMutation } from "@apollo/client";
import ToDos from "../Components/ToDos.js";
import { Description } from "../Components/Styled/Description.styled";
import AddToDo from "../Components/AddToDo";

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const ADD_TODO = gql`
  mutation AddToDo($desc: String!, $dueDate: Date, $tags: [String]) {
    addToDo(desc: $desc, dueDate: $dueDate, tags: $tags) {
      desc
      dueDate
      completed
    }
  }
`;

const Home = () => {
  const client = useApolloClient();
  const { data } = useQuery(IS_LOGGED_IN);

  const [NewToDo] = useMutation(ADD_TODO, {
    onCompleted: (data) => {},
  });

  return (
    <>
      {data.isLoggedIn ? (
        <>
          <ToDos />
          <AddToDo newToDo={NewToDo} />
        </>
      ) : (
        <Description>
          <h1>Welcome to To Do</h1>
          <h3>Productivity, here we come....</h3>
          <Link to='/signin'>Please sign in to view your tasks</Link>
          New to To Do? <Link to='/signup'>Sign up</Link>{" "}
          <button>Sign in</button>
        </Description>
      )}
    </>
  );
};

export default Home;
