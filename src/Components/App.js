import React from "react";
import Pages from "../pages/index";
import { GlobalStyles } from "./GlobalStyle";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

function App() {
  const uri = process.env.REACT_APP_DB;
  const httpLink = createHttpLink({ uri });
  const cache = new InMemoryCache();

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    resolvers: {},
    cache,
  });

  const data = {
    isLoggedIn: Boolean(localStorage.getItem("token")),
  };

  const LOGGEDIN_QUERY = gql`
    query isLoggedIn {
      isLoggedIn
    }
  `;

  cache.writeQuery({
    query: LOGGEDIN_QUERY,
    data: data,
  });

  const sorted = {
    isSorted: localStorage.getItem("sorted"),
  };

  const SORTED_QUERY = gql`
    query isSorted {
      isSorted
    }
  `;

  cache.writeQuery({
    query: SORTED_QUERY,
    data: sorted,
  });

  return (
    <>
      <ApolloProvider client={client}>
        <GlobalStyles />
        <Pages />
      </ApolloProvider>
    </>
  );
}

export default App;
