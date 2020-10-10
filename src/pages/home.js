import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import ToDos from "../Components/ToDos.js";
import { Description } from "../Components/Styled/Description.styled";
import AddToDo from "../Components/AddToDo";
import { ADD_TODO } from "../Graphql/mutation";
import { IS_LOGGED_IN, GET_TODOS } from "../Graphql/query";

const Home = () => {
  const [ToDosData, setToDos] = useState([]);

  const { refetch } = useQuery(GET_TODOS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setToDos(data.toDoFeed.toDos);
    },
  });

  const { data } = useQuery(IS_LOGGED_IN);

  const [NewToDo] = useMutation(ADD_TODO, {
    onCompleted: (data) => {
      refetch();
    },
  });

  return (
    <>
      {data.isLoggedIn ? (
        <>
          <ToDos ToDosData={ToDosData} refetch={refetch} />
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
