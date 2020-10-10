import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation, useApolloClient } from "@apollo/client";

import ToDosList from "./ToDosList";
import styled from "styled-components";
import ToDoListHeader from "./ToDoListHeader";
import TagsList from "./TagsList";
import Calendar from "./Calendar";
import { ToDoResults } from "./Styled/ToDoResults";

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

const Container = styled.div`
  max-width: 720px;
  margin: 0px auto;
  padding: 0em 2em;
`;

const List = styled.div`
  height: 100%;
`;

const ToDos = () => {
  const [ToDosData, setToDos] = useState([]);
  const client = useApolloClient();

  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(false);
  const [openDate, toggleDate] = useState(false);
  const [activeToDo, setActive] = useState();

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

  const [completeToDo] = useMutation(COMPLETE_TODO, {
    onCompleted: (data) => {
      refetch();
    },
  });

  const [addDate] = useMutation(ADD_DATE, {
    onCompleted: (data) => {
      refetch();
    },
  });

  const [toggleUrgent] = useMutation(TOGGLE_URGENT, {
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

  const toggleCalendar = () => {
    if (openDate)
      return (
        <Calendar
          toggleDate={() => toggleDate(!openDate)}
          addDate={addDate}
          activeToDo={activeToDo}
        />
      );
  };

  return (
    <>
      {toggleCalendar()}
      <Container>
        <List>
          <TagsList
            tags={tags}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
          <ToDoListHeader
            isSorted={isSorted}
            sort={() => toggleSorted()}
          ></ToDoListHeader>
          <ToDoResults>
            {ToDosData.length ? (
              <ToDosList
                toDos={sortToDos()}
                completeToDo={completeToDo}
                toggleDate={() => toggleDate(!openDate)}
                toggleUrgent={toggleUrgent}
                setActive={setActive}
              />
            ) : (
              <p style={{ textAlign: "center" }}>You're all caught up!</p>
            )}
          </ToDoResults>
        </List>
      </Container>
    </>
  );
};

export default ToDos;

//
