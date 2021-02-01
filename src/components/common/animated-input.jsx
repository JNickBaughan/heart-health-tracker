import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

export default ({
  value,
  onChange,
  placeholder,
  handleBlur,
  id,
  name,
  hasError
}) => {
  const textInput = useRef(null);
  const mockInput = useRef(null);

  const [hasFocus, setHasFocus] = useState(false);
  const [newChar, setNewChar] = useState("");
  const [text, setText] = useState(value);
  const [_placeholder, set_placeHolder] = useState(placeholder);

  useEffect(() => {
    setText(value);
  }, [value]);

  const PlaceholderSpan = styled.span`
    color: grey;
  `;

  const HiddenInput = styled.input`
    position: relative;
    left: -2000px;
    width: 0;
    height: 0;
    border: white;
    z-index: -200;
  `;

  const MockedInput = styled.div`
    position: relative;
    top: -23px;
    height: 10px;
    text-align: center;
    padding: 20px;
    padding-top: 25px;
    border-bottom: ${(props) =>
      props.hasError ? "red solid 1px" : "black solid 1px"};
    width: ${(props) => props.width};
  `;

  const blink = keyframes`
		from {  
			background: white;
			color: white;
		}
		to {  
			background: black;
			color: black;
		}
	`;

  const Cursor = styled.span`
    animation: ${blink} 1.05s linear infinite;
    width: 5px;
    margin-left: 2px;
    display: ${(props) => (props.hasFocus ? "inline" : "none")};
  `;

  const textDrop = keyframes`
		from {top: -10px;}
		to {top: 0px;}
	`;

  const NewCharacter = styled.span`
    animation: ${textDrop} 0.5s;
    position: relative;
  `;

  const onFocus = () => {
    setHasFocus(true);
    set_placeHolder(null);
    textInput.current.focus();
  };

  const onBlur = () => {
    setHasFocus(false);
    set_placeHolder(text ? null : placeholder);
    setNewChar("");
    onChange(text);
    handleBlur && handleBlur();
  };

  const onKeyInput = (e) => {
    const input = e.key;
    if (input === "Backspace") {
      setNewChar("");
      setText(`${text.length === 1 ? "" : text.slice(0, -1)}`);
    } else {
      setNewChar(input);
      setText(`${text}${input}`);
    }
  };

  return (
    <>
      <HiddenInput
        value={text}
        placeholder={placeholder}
        onKeyUp={onKeyInput}
        onBlur={onBlur}
        ref={textInput}
        autoFocus={hasFocus}
        id={id}
        name={name}
      />
      <MockedInput
        onClick={onFocus}
        hasFocus={hasFocus}
        ref={mockInput}
        width={"200px"}
        id={id}
        name={name}
        hasError={hasError}
      >
        <PlaceholderSpan>{!text && _placeholder}</PlaceholderSpan>
        {newChar !== "" && hasFocus ? text.slice(0, -1) : text}
        {newChar !== "" && hasFocus ? (
          <NewCharacter>{newChar}</NewCharacter>
        ) : null}
        <Cursor hasFocus={hasFocus}>|</Cursor>
      </MockedInput>
    </>
  );
};
