import React from "react";
import { StyledLabel } from "../../components/forms/generalFormComponents";

interface Props {
  labelText: string;
  htmlFor: string;
}

const FormLabel = ({ labelText, htmlFor }: Props) => {
  return <StyledLabel htmlFor={htmlFor}>{labelText}</StyledLabel>;
};

export default FormLabel;
