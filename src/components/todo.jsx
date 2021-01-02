import React from "react";
import styled from "styled-components";

const ToDo = styled.div`
  background-color: yellow;
  position: absolute;
  width: 30em;
  height: 40em;
`;

const TodoList = () => {
  const [showTodo, setShowTodo] = React.useState(true);
  return showTodo ? (
    <ToDo>
      <button
        onClick={() => {
          setShowTodo(!showTodo);
        }}
      >
        Hide Todo list
      </button>
      <ul>
        <li>Form</li>
        <li>add</li>
        <li>delete</li>
        <li>edit</li>
        <li>Validation</li>
        <li>add icons for up down flat</li>
        <li>color code measurements</li>
        <li>add scroll</li>
      </ul>
    </ToDo>
  ) : (
    <button
      onClick={() => {
        setShowTodo(!showTodo);
      }}
    >
      Show Todo list
    </button>
  );
};

export default TodoList;
