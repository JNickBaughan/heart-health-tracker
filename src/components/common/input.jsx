import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import AnimatedInput from "./animated-input";

const Wrapper = styled.div`
  padding: 10px 2px;
`;

const Label = styled.label`
  color: ${(props) => (props.hasError ? "red" : "black")};
`;

const ErrorMessageDiv = styled.div`
  font-size: 12px;
  position: relative;
  bottom: 12px;
  left: 108px;
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
  isDate = false,
  placeholder
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
        <AnimatedInput
          id={id}
          name={id}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder}
          hasError={hasError}
        />
      )}

      {hasError && <ErrorMessageDiv>{errorMessage}</ErrorMessageDiv>}
    </Wrapper>
  );
};

export default ValidatableInput;
