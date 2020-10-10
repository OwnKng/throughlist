import React, { useState, useRef } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Form } from "./Styled/Form.styled";

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
    <Form>
      <form
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
        <input
          id='todo'
          name='desc'
          autoComplete='off'
          ref={textRef}
          type='text'
          onChange={onChange}
          placeholder='Add a to do #productive #today'
        />
        <input autoComplete='on' type='hidden' value='something' />
        <button type='submit'>
          <AiOutlineArrowUp />
        </button>
      </form>
    </Form>
  );
};

export default AddToDo;
