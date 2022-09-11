import React from "react";
import styled from "styled-components";

const SubtextContent = styled.span`
   {
    font-size: 0.7rem;
    display: block;
    margin-bottom: 0.25rem;
  }
`;

const Subtext = ({ subtextMessage }: any) => {
  return <SubtextContent>{subtextMessage}</SubtextContent>;
};

export default Subtext;
