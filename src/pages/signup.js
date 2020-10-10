import React, { useState } from "react";
import { useMutation, useApolloClient, gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { SignInForm } from "../Components/Styled/SignIn.styled";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <SignInForm>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signUp({
            variables: {
              ...values,
            },
          });
        }}
      >
        <h2>Create an account</h2>
        {error && (
          <motion.div
            className='error'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
          >
            Error signing up. If you already have an account, please{" "}
            <Link style={{ textDecoration: "none" }} to='signin'>
              sign in
            </Link>
          </motion.div>
        )}
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' onChange={onChange} />
        <label htmlFor='password'>Password</label>
        <input id='pwd' name='password' type='password' onChange={onChange} />
        <button>Sign up</button>
      </form>
    </SignInForm>
  );
};

export default SignUp;
