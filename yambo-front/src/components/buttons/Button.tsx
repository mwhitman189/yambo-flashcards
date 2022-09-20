import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button<{ fontSize?: string }>`
  border-radius: 4px;
  background-color: ${({ theme }) => theme?.colors?.highlightSecondary};
  text-align: center;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
  border: none;
  outline: none;
  padding: 0.25rem 0.75rem;
  color: ${({ theme }) => theme?.colors?.inputBackground};
  margin-bottom: 0.5rem;
  &:focus,
  &:hover {
    background-color: #1fdb77;
    color: ${({ theme }) => theme?.colors?.grayPrimary};
  }
`;

const Button = ({ text, type, tabIndex, fontSize }: any) => {
  return (
    <ButtonStyle type={type} tabIndex={tabIndex} fontSize={fontSize}>
      {text}
    </ButtonStyle>
  );
};

export default Button;