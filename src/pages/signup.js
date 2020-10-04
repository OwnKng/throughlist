import React, { useState } from "react";
import { useMutation, useApolloClient, gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password)
  }
`;

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Form = styled.form`
  max-width: 720px;
  margin: 0px auto;
  background-color: white;
  padding: 10px 10px;
  height: 450px;

  h3 {
    margin-bottom: 40px;
  }

  label {
    display: block;
    font-size: 1;
  }

  input {
    display: block;
    width: 80%;
    height: 60px;
    font-size: 1.25rem;
    color: white;
    border: none;
    border-bottom: 1px solid rgb(222, 222, 222);

    margin: 0px 0px 30px 0px;

    color: rgb(50, 50, 50);

    :focus {
      outline: none;
    }
  }

  p {
    display: inline;
    font-weight: bold;
    margin-right: 50px;
  }

  svg {
    font-size: 1rem;
  }

  button {
    border-radius: 5px;
    height: 40px;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    background-color: rgb(2, 25, 61);
  }
`;

const Error = styled.p`
  display: block;
  font-weight: 100;
  color: red;
`;

const SignUp = () => {
  const [values, setValues] = useState();

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const history = useHistory();
  const client = useApolloClient();

  const { data } = useQuery(IS_LOGGED_IN);
  if (data.isLoggedIn) history.push("/");

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signIn);
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      history.push("/");
    },
  });

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          signUp({
            variables: {
              ...values,
            },
          });
        }}
      >
        <h3>Create an account</h3>
        {error && (
          <Error>
            Error signing up. If you already have an account, go to sign in
          </Error>
        )}
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' onChange={onChange} />
        <label htmlFor='password'>Email</label>
        <input id='pwd' name='password' type='password' onChange={onChange} />
        <button>Sign up</button>
      </Form>
    </>
  );
};

export default SignUp;
