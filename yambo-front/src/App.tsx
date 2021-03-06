import React from 'react';
import Header from './components/Header'
import { ThemeProvider } from 'styled-components';
import './App.css';

const theme = {
  colorPrimary: "blue"
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;
