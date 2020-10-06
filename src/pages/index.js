import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import the components
import Home from "./home";
import Layout from "../Components/Layout";
import SignIn from "./signin.js";
import SignUp from "./signup.js";

const Pages = () => {
  return (
    <>
      <Router>
        <Layout>
          <Route exact path='/' component={Home}></Route>
          <Route path='/signin' component={SignIn}></Route>
          <Route path='/signup' component={SignUp}></Route>
        </Layout>
      </Router>
    </>
  );
};

export default Pages;
