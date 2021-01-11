import React from "react";
import styled from "styled-components";

const StyledButton = styled.a`
  border-radius: 6px;
  border: 1px solid #b2b8ad;
  display: inline-block;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  margin: 2px;
  &:hover {
    background: linear-gradient(to bottom, grey 5%, white 100%);
    background-color: #grey;
  }
`;

const Button = (props) => {
  return <StyledButton onClick={props.onClick}>{props.title}</StyledButton>;
};

export default Button;
