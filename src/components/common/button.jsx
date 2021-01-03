import React from "react";
import styled from "styled-components";

const StyledButton = styled.a`
  box-shadow: inset 0px 0px 14px -3px #f2fadc;
  background: linear-gradient(to bottom, #dbe6c4 5%, #9ba892 100%);
  background-color: #dbe6c4;
  border-radius: 6px;
  border: 1px solid #b2b8ad;
  display: inline-block;
  cursor: pointer;
  color: #757d6f;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ced9bf;
  &:hover {
    background: linear-gradient(to bottom, #9ba892 5%, #dbe6c4 100%);
    background-color: #9ba892;
  }
`;

const Button = (props) => {
  return <StyledButton onClick={props.onClick}>{props.title}</StyledButton>;
};

export default Button;
