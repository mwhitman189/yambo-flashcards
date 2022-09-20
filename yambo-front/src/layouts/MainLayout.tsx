import React from "react";
import { AppContainer, OverallPageContainer } from "../components/containers/generalContainers";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

interface ThemeProps {
  children: JSX.Element;
}

const MainLayout = ({ children }: ThemeProps) => {
  return (
    <OverallPageContainer>
      <Navbar />
      <AppContainer>{children}</AppContainer>
      <Footer />
    </OverallPageContainer>
  );
};

export default MainLayout;
