import React from "react";
import styled from "styled-components";

interface Props {
  labelFont: string;
}

const Label = styled.label<Props>`
  font-size: ${({ labelFont }) => (labelFont ? labelFont : "18px")};
  display: block;
`;

const FormLabel = ({ labelFont, labelText, htmlFor }: any) => {
  return (
    <Label labelFont={labelFont} htmlFor={htmlFor}>
      {labelText}
    </Label>
  );
};

export default FormLabel;
