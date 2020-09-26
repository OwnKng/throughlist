import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation, useApolloClient } from "@apollo/client";

import ToDosList from "../Components/ToDosList";
import AddToDo from "../Components/AddToDo";
import styled from "styled-components";
import SortBy from "../Components/SortBy";
import TagsList from "../Components/TagsList";

const GET_TODOS = gql`
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

const ADD_TODO = gql`
  mutation AddToDo($desc: String!, $dueDate: Date, $tags: [String]) {
    addToDo(desc: $desc, dueDate: $dueDate, tags: $tags) {
      desc
      dueDate
      completed
    }
  }
`;

const COMPLETE_TODO = gql`
  mutation CompleteToDo($id: ID!) {
    completeToDo(id: $id)
  }
`;

const ADD_DATE = gql`
  mutation AddDate($id: ID!, $date: Date!) {
    addDate(id: $id, date: $date)
  }
`;

const TOGGLE_URGENT = gql`
  mutation ToggleUrgent($id: ID!) {
    toggleUrgent(id: $id)
  }
`;

const IS_SORTED = gql`
  {
    isSorted @client
  }
`;

const ToDoResults = styled.div`
  width: 100%;
  min-width: 480px;
  max-width: 720px;
  justify-self: left;
`;

const List = styled.div`
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const Container = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 4fr;
  justify-items: center;
  grid-gap: 10px;
  margin: 0px auto;
  width: 80%;
`;

const ToDos = () => {
  const [ToDosData, setToDos] = useState([]);
  const client = useApolloClient();

  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(false);

  const { data, loading, error, refetch, fetchmore } = useQuery(GET_TODOS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setToDos(data.toDoFeed.toDos);
    },
  });

  const [isSorted, setSorted] = useState(false);

  const { sorted } = useQuery(IS_SORTED, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setSorted(JSON.parse(data.isSorted));
    },
  });

  const [NewToDo, { loadingSession, errorCreatingSession }] = useMutation(
    ADD_TODO,
    {
      onCompleted: (data) => {
        refetch();
      },
    }
  );

  const [completeToDo, { errorCompleting }] = useMutation(COMPLETE_TODO, {
    onCompleted: (data) => {
      refetch();
    },
  });

  const [addDate, { errorAddingDate }] = useMutation(ADD_DATE, {
    onCompleted: (data) => {
      refetch();
    },
  });

  const [toggleUrgent, { errorMarkingUrgent }] = useMutation(TOGGLE_URGENT, {
    onCompleted: (data) => {
      refetch();
    },
  });

  useEffect(() => {
    let tags = [];
    if (ToDosData) ToDosData.map((toDo) => tags.push(toDo.tags));
    tags = tags.flat();
    setTags([...new Set(tags)]);
  }, [ToDosData]);

  const sortByDate = (data) => {
    const sorted = [...data].sort((a, b) => {
      let dateA = new Date(a.dueDate);
      let dateB = new Date(b.dueDate);
      return dateA - dateB;
    });
    return sorted;
  };

  const toggleSorted = () => {
    const checkSorted = isSorted;
    client.writeQuery({
      query: IS_SORTED,
      data: {
        isSorted: !checkSorted,
      },
    });
    localStorage.setItem("sorted", !checkSorted);
    checkSorted ? setSorted(false) : setSorted(true);
  };

  const sortToDos = () => {
    const toDos = activeTag
      ? ToDosData.filter((toDo) => toDo.tags.includes(activeTag))
      : ToDosData;
    return isSorted ? sortByDate(toDos) : toDos;
  };

  return (
    <>
      <Container>
        <TagsList
          tags={tags}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />
        <ToDoResults>
          <SortBy isSorted={isSorted} sort={() => toggleSorted()}></SortBy>
          <AddToDo newToDo={NewToDo} />
          {ToDosData.length ? (
            <List>
              <ToDosList
                toDos={sortToDos()}
                completeToDo={completeToDo}
                addDate={addDate}
                toggleUrgent={toggleUrgent}
              />
            </List>
          ) : (
            <p style={{ textAlign: "center" }}>You're all caught up!</p>
          )}
        </ToDoResults>
      </Container>
    </>
  );
};

export default ToDos;
