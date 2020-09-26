import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Welcome to To Do</h1>
      <h3>Productivity, here we come....</h3>
      <Link to='/signin'>Please sign in to view your tasks</Link>
      <p>
        New to To Do? <Link to='/signup'>Sign up</Link>{" "}
      </p>
    </>
  );
};

export default Home;
