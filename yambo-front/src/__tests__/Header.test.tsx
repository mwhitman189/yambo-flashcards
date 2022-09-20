import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../layouts/header/Header";

it("should render same text passed into title prop", () => {
  render(<Header title="Welcome to Yambo!" />);
  const headerText = screen.getByText("Welcome to Yambo!");
  expect(headerText).toBeInTheDocument();
});
