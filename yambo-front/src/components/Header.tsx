import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.h1`
  display: flex;
  justify-content: center;
  color: #fff;
`;

function Header() {
  return (
    <header className="App-header">
      <HeaderStyle>Welcome to Yambo!</HeaderStyle>
    </header>
  );
}

export default Header;
