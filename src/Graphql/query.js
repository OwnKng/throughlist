import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query ToDoFeed($cursor: String) {
    toDoFeed(cursor: $cursor) {
      toDos {
        id
        desc
        dueDate
        completed
        urgent
        tags
      }
      cursor
      hasNextPage
    }
  }
`;

export const IS_SORTED = gql`
  {
    isSorted @client
  }
`;

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;
