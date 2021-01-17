import React from "react";
import styled from "styled-components";
import Button from "./common/button";

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
      <Button
        onClick={() => {
          setShowTodo(!showTodo);
        }}
        title={"Hide Todo list"}
      />
      <ul>
        <Done>add Form</Done>
        <Done>add</Done>
        <Done>delete</Done>
        <Done>edit</Done>
        <Done>add a confirmation modal for delete</Done>
        <Done>add Yup Validation</Done>
        <Done>add validation for date</Done>
        <Done>add icons for delete and edit</Done>
        <Done>add icons for up down flat</Done>
        <Done>color code measurements</Done>
        <li>add scroll</li>
        <li>add fancy input</li>
        <Done>add graphQL(maybe)</Done>
        <Done>add patient lookup (maybe)</Done>
        <li>update css so page doesn't look like crap</li>
        <li>add patient lookup (maybe)</li>
        <li>add an error message modal</li>
        <li>wire delete functionality to graphQL and dynamo</li>
        <li>wire update functionality to graphQL and dynamo</li>
        <li>make app responsive</li>
      </ul>
    </ToDo>
  ) : (
    <Button
      onClick={() => {
        setShowTodo(!showTodo);
      }}
      title={"Show Todo list"}
    />
  );
};

export default TodoList;
