import { gql } from "@apollo/client";

export const COMPLETE_TODO = gql`
  mutation CompleteToDo($id: ID!) {
    completeToDo(id: $id)
  }
`;

export const ADD_DATE = gql`
  mutation AddDate($id: ID!, $date: Date!) {
    addDate(id: $id, date: $date)
  }
`;

export const TOGGLE_URGENT = gql`
  mutation ToggleUrgent($id: ID!) {
    toggleUrgent(id: $id)
  }
`;

export const ADD_TODO = gql`
  mutation AddToDo($desc: String!, $dueDate: Date, $tags: [String]) {
    addToDo(desc: $desc, dueDate: $dueDate, tags: $tags) {
      desc
      dueDate
      completed
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
