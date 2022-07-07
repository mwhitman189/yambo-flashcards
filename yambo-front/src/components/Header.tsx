import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
}

const HeaderStyle = styled.h1`
  text-align: center;
  color: #fff;
  font-size: 50px;
`;

function Header({ title }: Props) {
  return (
    <header className="App-header">
      <HeaderStyle>{title}</HeaderStyle>
    </header>
  );
}

export default Header;
