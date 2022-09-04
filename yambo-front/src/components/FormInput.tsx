import React from "react";
import styled from "styled-components";

const FormTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  padding-left: 0.75rem;
  border-radius: 4px;
  text-align: left;
  outline: none;
  color: ${({ theme }) => theme?.colors?.textSecondary};
  background-color: ${({ theme }) => theme?.colors?.inputBackground};
  font-size: 20px;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  ::placeholder {
    color: ${({ theme }) => theme?.colors?.textSecondary};
    opacity: 0.5;
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme?.colors?.highlightPrimaryLight};
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const Input = styled.input`
{
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  margin-bottom: .75rem;
  padding-left: 0.75rem;
  border-radius: 4px;
  text-align: left;
  outline: none;
  color: ${({ theme }) => theme?.colors?.textSecondary};
  background-color: ${({ theme }) => theme?.colors?.inputBackground};
  font-size: 20px;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  ::placeholder {
    color: ${({ theme }) => theme?.colors?.textSecondary};
    opacity: 0.5;
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme?.colors?.highlightPrimaryLight};
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const FormField = ({
  fieldType = "input",
  required = true,
  type,
  name,
  id,
  placeholder,
  value,
  tabIndex,
  onChange,
  onClick
}: any) => {
  return (
    <div>
      {fieldType === "textarea" ? (
        <FormTextArea
          rows={3}
          tabIndex={tabIndex}
          required={required}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}></FormTextArea>
      ) : (
        <Input
          tabIndex={tabIndex}
          required
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          type={type}
          id={id}></Input>
      )}
    </div>
  );
};

export default FormField;
