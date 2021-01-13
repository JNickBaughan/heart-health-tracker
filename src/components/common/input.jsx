import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

const Wrapper = styled.div`
  padding: 10px 2px;
`;

const Input = styled.input`
  width: 43%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: ${(props) => (props.hasError ? "1px solid red" : "1px solid #ccc")};
  border-radius: 4px;
  box-sizing: border-box;
`;

const Label = styled.label`
  color: ${(props) => (props.hasError ? "red" : "black")};
`;

const ErrorMessageDiv = styled.div`
  font-size: 12px;
  position: relative;
  bottom: 37px;
  left: 220px;
  color: red;
`;

const ValidatableInput = ({
  hasError,
  label,
  id,
  handleChange,
  handleBlur,
  value,
  errorMessage,
  isDate = false
}) => {
  return (
    <Wrapper>
      <Label hasError={hasError}>{label}</Label>
      <br />
      {isDate ? (
        <DatePicker
          id={id}
          type={id}
          selected={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={hasError ? "error" : ""}
        />
      ) : (
        <Input
          id={id}
          name={id}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          hasError={hasError}
        />
      )}

      {hasError && <ErrorMessageDiv>{errorMessage}</ErrorMessageDiv>}
    </Wrapper>
  );
};

export default ValidatableInput;
