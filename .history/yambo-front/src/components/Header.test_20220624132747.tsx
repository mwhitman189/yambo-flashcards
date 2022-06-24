import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './components/Header';


test('displays the title "Yambo!"', () => {
  render(<Header />);
  const headerText = screen.getByText(/Welcome!/);
  expect(headerText).toBeInTheDocument();
})

