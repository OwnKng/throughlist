import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Import the components
import Home from "./home";
import Profile from "./profile";
import Layout from "../Components/Layout";
import SignIn from "./signin.js";
import SignUp from "./signup.js";
import ToDos from "./todos";
import Completed from "./completed";

import { useQuery, gql } from "@apollo/client";

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Route
      {...rest}
      render={(props) =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Pages = () => {
  return (
    <>
      <Router>
        <Layout>
          <Route exact path='/' component={Home}></Route>
          <PrivateRoute path='/todos' component={ToDos}></PrivateRoute>
          <PrivateRoute path='/profile' component={Profile}></PrivateRoute>
          <PrivateRoute path='/completed' component={Completed}></PrivateRoute>
          <Route path='/signin' component={SignIn}></Route>
          <Route path='/signup' component={SignUp}></Route>
        </Layout>
      </Router>
    </>
  );
};

export default Pages;
