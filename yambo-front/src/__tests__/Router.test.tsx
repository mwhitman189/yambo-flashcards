import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import App, { LocationDisplay } from "../App";

test("full app rendering/navigating", async () => {
  render(<App />, { wrapper: BrowserRouter });
  const user = userEvent.setup();

  // verify page content for default route
  expect(screen.getByText(/Welcome to Yambo/i)).toBeInTheDocument();

  // verify page content for expected route after navigating
  await user.click(screen.getByText(/Register/i));
  expect(screen.getByText(/Registration/i)).toBeInTheDocument();
});
