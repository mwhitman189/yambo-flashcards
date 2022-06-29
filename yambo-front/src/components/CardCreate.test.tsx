import React from "react";
import { render, screen } from "@testing-library/react";
import CardCreate from "./CardCreate";

test('displays the title "Yambo!"', () => {
  render(<CardCreate />);
  const headerText = screen.getByText(/Welcome!/);
  expect(headerText).toBeInTheDocument();
});
