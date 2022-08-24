import React from "react";

import FormLabel from "./FormLabel";
import FormInput from "./FormInput";

const FormField = ({
  fieldType = "input",
  required = true,
  type,
  name,
  id,
  placeholder,
  value,
  tabIndex,
  labelText,
  htmlFor,
  onChange,
  onClick,
  labelFont
}: any) => {
  return (
    <div>
      <FormLabel labelText={labelText} labelFont={labelFont} htmlFor={htmlFor}></FormLabel>
      <FormInput
        fieldType={fieldType}
        tabIndex={tabIndex}
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        type={type}
        id={id}></FormInput>
    </div>
  );
};

export default FormField;
