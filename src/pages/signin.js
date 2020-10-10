import React, { useState } from "react";
import { useMutation, useApolloClient, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { SIGNIN_USER } from "../Graphql/mutation";
import { IS_LOGGED_IN } from "../Graphql/query";
import { SignInForm } from "../Components/Styled/SignIn.styled";
import { motion } from "framer-motion";
import { Button } from "../Components/Styled/Button.styled";

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
  if (data.isLoggedIn) history.push("/");

  const [signIn, { error }] = useMutation(SIGNIN_USER, {
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
    <SignInForm>
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
        <h2>Sign in</h2>
        {error && (
          <motion.div
            className='error'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
          >
            Error signing in. Please check your credentials and try again
          </motion.div>
        )}
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' onChange={onChange} />
        <label htmlFor='pwd'>Password</label>
        <input id='pwd' name='password' type='password' onChange={onChange} />
        <button>Sign in</button>
      </form>
    </SignInForm>
  );
};

export default SignIn;
