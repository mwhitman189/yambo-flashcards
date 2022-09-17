import { render, fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import Registration from "../pages/Registration";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import validationTest from "../helpers/validationTest";

import { MOCK_USER } from "../mocks/MOCK_USER";

//Set up msw server
const server = setupServer(
  rest.post("/addUser", (req, res, ctx) => {
    return res(ctx.json(MOCK_USER));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const url = "/addUser";

describe("Registration", () => {

  const renderReg = (email?: string, password?: string, confirm?: string) => {
    render(<BrowserRouter><Registration /></BrowserRouter>);
    validationTest("Submit", email, password, confirm);
  }

  it("should show an error if email is invalid", async () => {
    renderReg("bill.com");
  });

  it("should show an error if passwords don't match", async () => {
    renderReg("bill@bmail.com", "Jmoney$$1", "bladdyblah$$1");
  });

  it("should show an error if password doesn't include a number", async () => {
    renderReg("bill@bmail.com", "Jmoney$$$", "Jmoney$$$");
  });

  it("should show an error if password doesn't include an uppercase letter", async () => {
    renderReg("bill@bmail.com", "jmoney$$1", "jmoney$$1");
  });

  it("should show an error if password doesn't a lowercase letter", async () => {
    renderReg("bill@bmail.com", "JMONEY$$1", "JMONEY$$1");
  });

  it("should show an error if password doesn't include a special character", async () => {
    renderReg("bill@bmail.com", "Jmoney111", "Jmoney111");
  });

  it("should show an error if password is less than 8 characters long", async () => {
    renderReg("bill@bmail.com", "Money1$", "Money1$");
  });

  // API Tests
  test("handles server error", async () => {
    server.use(
      rest.post("/addUser", (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    render(<BrowserRouter><Registration url={url} /></BrowserRouter>);

    const inputEmail = screen.getByPlaceholderText(/Enter email/i) as HTMLInputElement;
    fireEvent.change(inputEmail, { target: { value: "justjohnd@gmail.com" } });

    const inputPassword = screen.getByPlaceholderText(/Enter password/i) as HTMLInputElement;
    fireEvent.change(inputPassword, { target: { value: "Jmoney$$1" } });

    const confirmPassword = screen.getByPlaceholderText(/Confirm password/i) as HTMLInputElement;
    fireEvent.change(confirmPassword, { target: { value: "Jmoney$$1" } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => expect(
      screen.getByText(
        "Either your email or password is inccorect. Please try again."
      )
    ).toBeInTheDocument);

    expect(
      screen.getByText(
        "Either your email or password is inccorect. Please try again."
      )
    ).toBeInTheDocument;
  });

  test("handles server success", async () => {

    // Note: this test needs improvement. It should be testing navigation to the home page instead of a message that the user never actually sees.
    render(<BrowserRouter><Registration url={url} /></BrowserRouter>);

    const inputEmail = screen.getByPlaceholderText(/Enter email/i) as HTMLInputElement;
    fireEvent.change(inputEmail, { target: { value: "billy@gmail.com" } });

    const inputPassword = screen.getByPlaceholderText(/Enter password/i) as HTMLInputElement;
    fireEvent.change(inputPassword, { target: { value: "Jmoney$$1" } });

    const confirmPassword = screen.getByPlaceholderText(/Confirm password/i) as HTMLInputElement;
    fireEvent.change(confirmPassword, { target: { value: "Jmoney$$1" } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading-indicator"));

    expect(
      screen.getByText(
        "You did it!"
      )
    ).toBeInTheDocument;

  });

});
