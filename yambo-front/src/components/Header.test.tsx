import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("displays the title", () => {
  render(<Header />);
  const headerText = screen.getByText(/Welcome to Yambo!/);
  expect(headerText).toBeInTheDocument();
});
