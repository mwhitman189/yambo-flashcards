import React from "react";
import Header from "./components/Header";
import CardCreate from "./components/CardCreate";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";

const theme1 = {
  colors: {
    backgroundPrimary: '#28546B',
    backgroundSecondary: '#0B3345',
    textPrimary: '#F7F7F7',
    textSecondary: '#002231',
    inputBackground: '#fff',
    highlightPrimary: '#ba68c9',
    highlightPrimaryLight: '#e0bde6',
    highlightSecondary: '#14AE5C',
    grayPrimary: '#6a6a6a'
  }
};

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
`

function App() {
  return (
    <ThemeProvider theme={theme1}>
      <AppContainer className="App">
        <Header title="Welcome to Yambo!" />
        <CardCreate />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
