import React from "react";
import { StyledFormTextArea, StyledTextInput } from "../../components/forms/generalFormComponents";

const FormField = ({
  fieldType = "input",
  required = true,
  autoFocus,
  type,
  name,
  id,
  placeholder,
  value,
  tabIndex,
  onChange
}: any) => {
  return (
    <>
      {fieldType === "textarea" ? (
        <StyledFormTextArea
          rows={3}
          tabIndex={tabIndex}
          required={required}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}></StyledFormTextArea>
      ) : (
        <StyledTextInput
          tabIndex={tabIndex}
          required
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          id={id}
          autoFocus={autoFocus}></StyledTextInput>
      )}
    </>
  );
};

export default FormField;
