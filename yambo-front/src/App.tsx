import React from "react";
import { ThemeProvider } from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import CardCreate from "./pages/CardCreate/CardCreate";
import Home from "./pages/Home/Home";
import NotFound from "./pages/404/NotFound";
import MainLayout from "./layouts/MainLayout";
import { GlobalStyles, theme1 } from "./assets/styles/GloablStyles";

const url = "https://jotoba.de/api/search/words";

export const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

const loginUrl = `http://localhost:8888/user/login`;
const registrationUrl = `http://localhost:8888/user/signup`;

function App() {
  return (
    <ThemeProvider theme={theme1}>
      <GlobalStyles />
      <MainLayout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/create" element={<CardCreate url={url} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login url={loginUrl} />} />
          <Route path="/registration" element={<Registration url={registrationUrl} />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
