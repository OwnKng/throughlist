import React, { useState, useRef } from "react";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  max-width: 720px;
  margin: 0px auto;
  display: grid;
  grid-template: 1fr / 0.5fr 5fr;
  background-color: white;
  height: 70px;
  border-bottom: 2px solid rgb(50, 50, 50);
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  color: white;
  border: none;

  color: rgb(50, 50, 50);

  :focus {
    outline: none;
  }
`;

const Plus = styled.div`
  color: rgb(50, 50, 50);
  margin-left: 5px;
  padding: 15px;
  font-size: 2rem;
`;

const AddToDo = ({ newToDo }) => {
  const [values, setValues] = useState({});
  const textRef = useRef();

  const onChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.split("#");
    inputValue = inputValue.map((value) => value.trim());

    // seperate the to do and any tags
    const toDo = [...inputValue].splice(0, 1);
    const tags = [...inputValue].splice(1, inputValue.length - 1);

    setValues({ ...values, desc: toDo.toString(), tags: tags });
  };

  return (
    <>
      <Form
        autoComplete='off'
        onSubmit={(event) => {
          event.preventDefault();
          newToDo({
            variables: {
              ...values,
            },
          });
          textRef.current.value = "";
          textRef.current.focus();
          setValues({});
        }}
      >
        <Plus>+</Plus>
        <Input
          id='todo'
          name='desc'
          autoComplete='off'
          ref={textRef}
          type='text'
          onChange={onChange}
          placeholder='Add a to do #productive #today'
        />
        <input autoComplete='on' type='hidden' value='something' />
      </Form>
    </>
  );
};

export default AddToDo;
