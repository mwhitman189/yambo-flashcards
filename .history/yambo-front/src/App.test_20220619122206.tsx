import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './components/Header';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('displays the title "Yambo!"', () => {
  render(<Header />);
  const headerText = screen.getByText(/Welcome!/);
  expect(headerText).toBeInTheDocument();
})