import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

it("should render same text passed into title prop", () => {
  render(<Header title="Welcome to Yambo!" />);
  const headerText = screen.getByRole("heading", { name: "Welcome to Yambo!" });
  expect(headerText).toBeInTheDocument();
});
