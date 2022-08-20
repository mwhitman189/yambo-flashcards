import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavLink className="navlink" to="/">
        Yambo
      </NavLink>
      <NavLink className="navlink" to="/registration">
        Register | Login
      </NavLink>
    </NavContainer>
  );
};

export default Navbar;
