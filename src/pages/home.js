import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import ToDos from "../Components/ToDos.js";
import { Description } from "../Components/Styled/Description.styled";
import AddToDo from "../Components/AddToDo";
import { ADD_TODO } from "../Graphql/mutation";
import { IS_LOGGED_IN, GET_TODOS } from "../Graphql/query";
import { demoToDos } from "../demotodos";
import DemoToDo from "../Components/DemoToDo";
import styled from "styled-components";
import { Button } from "../Components/Styled/Button.styled";
import { ActionPanel } from "../Components/Styled/ActionPanel.styled";

const DemoList = styled.div`
  display: grid;
  grid-gap: 5px;
  height: 300px;
`;

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
          <h1 style={{ textAlign: "center" }}>Welcome to ThroughList</h1>
          <h3 style={{ textAlign: "center" }}>The Powerful to Do List App</h3>
          <DemoList>
            <DemoToDo toDos={demoToDos}></DemoToDo>
          </DemoList>
          <ActionPanel>
            <div className='signUp'>
              New to ThroughList?
              <Button>
                <Link to='/signup'>Sign up</Link>{" "}
              </Button>
            </div>
            <div className='signIn'>
              Already got an account?
              <Button>
                <Link to='/signin'>Sign in</Link>{" "}
              </Button>
            </div>
          </ActionPanel>
        </Description>
      )}
    </>
  );
};

export default Home;
