import React from "react";
import Header from "./components/Header";
import CardCreate from "./components/CardCreate";
import { ThemeProvider } from "styled-components";
import "./App.css";

const theme = {
  colorPrimary: "blue"
};

// Hello

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <CardCreate />
      </div>
    </ThemeProvider>
  );
}

export default App;
