import React from "react";
import styled from "styled-components";

const colorDark = "#6a6a6a";
const colorWhite = "#f7f7f7";
const colorSuccess = "#14ae5c";

const Button = styled.button`
  height: 2.5rem;
  border-radius: 4px;
  background-color: ${colorSuccess};
  text-align: center;
  font-size: 20px;
  border: none;
  outline: none;
  padding: 0.25rem 0.75rem;
  color: ${colorWhite};
  &:focus,
  &:hover {
    background-color: #1fdb77;
    color: ${colorDark};
  }
`;

const Span = styled.span`
  vertical-align: middle;
`;

const SVG = styled.img`
  vertical-align: middle;
  margin-right: 0.25rem;
  height: 28px;
  button & {
    filter: invert(72%) sepia(77%) saturate(4574%) hue-rotate(241deg) brightness(88%) contrast(76%);
  }
  button:hover & {
    filter: invert(43%) sepia(6%) saturate(12%) hue-rotate(327deg) brightness(95%) contrast(97%);
  }
`;

const ButtonWithIcon = ({ handleClick }: any) => {
  return (
    <>
      <Button onClick={handleClick} aria-label="submit" type="submit">
        <SVG src="./plus-icon.svg"></SVG>
        <Span>Submit</Span>
      </Button>
    </>
  );
};

export default ButtonWithIcon;
