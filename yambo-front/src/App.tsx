import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import CardCreate from "./components/CardCreate";

const url = "https://jotoba.de/api/search/words";

const theme1 = {
  colors: {
    backgroundPrimary: "#28546B",
    backgroundSecondary: "#0B3345",
    textPrimary: "#F7F7F7",
    textSecondary: "#002231",
    inputBackground: "#fff",
    highlightPrimary: "#ba68c9",
    highlightPrimaryLight: "#e0bde6",
    highlightSecondary: "#14AE5C",
    grayPrimary: "#6a6a6a"
  }
};

const AppContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  min-height: 100vh;
  height: 100%;
`;

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

const loginUrl = `http://localhost:8888/user/login`;

function App() {
  return (
    <ThemeProvider theme={theme1}>
      <AppContainer className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<CardCreate url={url} />} />
          <Route path="*" element={<CardCreate url={url} to="/" />} />
          <Route path="/create" element={<CardCreate url={url} />} />
          <Route path="/login" element={<Login url={loginUrl} />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
