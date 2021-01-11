import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: fixed;
  top: 33%;
  left: 40%;
  margin-top: -50px;
  margin-left: -100px;
  width: 500px;
  background: white;
  height: 180px;
  border: 1px solid black;
  -webkit-filter: blur(0);
  padding: 20px;
  filter: blur(0);
`;

const Modal = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

export default Modal;
