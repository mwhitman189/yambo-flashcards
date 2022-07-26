import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
}

const HeaderStyle = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inputBackground};
  font-size: 50px;
`;

function Header({ title }: Props) {
  return (
    <HeaderStyle>{title}</HeaderStyle>
  );
}

export default Header;
