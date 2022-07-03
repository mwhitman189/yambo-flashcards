import React from "react";
import { render, screen } from "@testing-library/react";
import CardCreate from "./CardCreate";

test('displays the title "Yambo!"', () => {
  render(<CardCreate />);
  const Text = screen.getByText(/Start entering kanji below to generate a new flashcard/);
  expect(Text).toBeInTheDocument();
});
