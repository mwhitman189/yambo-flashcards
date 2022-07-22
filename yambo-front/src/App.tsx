import React from "react";
import Header from "./components/Header";
import CardCreate from "./components/CardCreate";
import { ThemeProvider } from "styled-components";
import "./App.css";

const theme = {
  colorPrimary: "blue"
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header title="Welcome to Yambo!" />
        <CardCreate />
      </div>
    </ThemeProvider>
  );
}

export default App;
