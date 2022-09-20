import React from "react";

import FormLabel from "./FormLabel";
import FormInput from "./FormInput";

const FormField = ({
  fieldType = "input",
  required = true,
  autoFocus = false,
  type,
  name,
  id,
  placeholder,
  value,
  tabIndex,
  labelText,
  htmlFor,
  onChange
}: any) => {
  return (
    <>
      <FormLabel labelText={labelText} htmlFor={htmlFor}></FormLabel>
      <FormInput
        fieldType={fieldType}
        tabIndex={tabIndex}
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        autoFocus={autoFocus}></FormInput>
    </>
  );
};

export default FormField;
