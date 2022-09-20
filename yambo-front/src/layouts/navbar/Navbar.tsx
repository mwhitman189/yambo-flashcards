import React from "react";
import { NavContainer } from "../../components/containers/generalContainers";
import { IconLink, RegisterLink } from "../../components/text/links";

const Navbar = () => {
  return (
    <NavContainer>
      <IconLink to="/">Yambo</IconLink>
      <RegisterLink to="/registration">Register | Login</RegisterLink>
    </NavContainer>
  );
};

export default Navbar;
