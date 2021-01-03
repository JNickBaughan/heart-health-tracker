import React from "react";
import styled from "styled-components";

const ToDo = styled.div`
  background-color: yellow;
  position: absolute;
  width: 30em;
  height: 40em;
  z-index: 50;
`;

const Done = styled.li`
  text-decoration: line-through;
`;

const TodoList = () => {
  const [showTodo, setShowTodo] = React.useState(false);
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
        <Done>add Form</Done>
        <Done>add</Done>
        <Done>delete</Done>
        <Done>edit</Done>
        <li>add a confirmation modal for delete</li>
        <li>add Yup Validation</li>
        <Done>add icons for delete and edit</Done>
        <li>add icons for up down flat</li>
        <li>color code measurements</li>
        <li>add scroll</li>
        <li>add fancy input</li>
        <li>add graphQL(maybe)</li>
        <li>add patient lookup (maybe)</li>
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
