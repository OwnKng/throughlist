import React, { useState } from "react";
import { useMutation, useApolloClient, gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const SignIn = () => {
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
  if (data.isLoggedIn) history.push("/todos");

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
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
      <p>Signin</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signIn({
            variables: {
              ...values,
            },
          });
        }}
      >
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' onChange={onChange} />
        <label htmlFor='pwd'>Password</label>
        <input id='pwd' name='password' type='password' onChange={onChange} />
        <button>Sign me in</button>
      </form>
    </>
  );
};

export default SignIn;
