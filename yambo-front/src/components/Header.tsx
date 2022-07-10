import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.h1`
  text-align: center;
  color: #fff;
  font-size: 50px;
`;

function Header() {
  return (
    <header className="App-header">
      <HeaderStyle>Welcome to Yambo Flashcards!</HeaderStyle>
    </header>
  );
}

export default Header;
