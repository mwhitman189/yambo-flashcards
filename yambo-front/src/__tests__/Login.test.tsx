import { render, fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import validationTest from "../helpers/validationTest";


import { MOCK_USER } from "../mocks/MOCK_USER";

//Set up msw server
const server = setupServer(
  rest.post("/getUser", (req, res, ctx) => {
    return res(ctx.json(MOCK_USER));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const url = "/getUser";

describe("Login", () => {
  //Smokescreen tests
  it("should render the login header and input elements", async () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument;

    const inputEmail = screen.getByPlaceholderText(/Enter email/i) as HTMLInputElement;
    const inputPassword = screen.getByPlaceholderText(/Enter password/i) as HTMLInputElement;
    expect(inputEmail).toBeInTheDocument;
    expect(inputPassword).toBeInTheDocument;

  });

  //Frontend form validation tests
  const renderLogin = (email?: string, password?: string) => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    validationTest("Login", email, password);
  }

  it("should show an error if email is invalid", async () => {
    renderLogin("bill.com");
  });

  it("should show an error if password doesn't include a number", async () => {
    renderLogin("bill@bmail.com", "Jmoney$$$");
  });

  it("should show an error if password doesn't include an uppercase letter", async () => {
    renderLogin("bill@bmail.com", "jmoney$$1");
  });

  it("should show an error if password doesn't a lowercase letter", async () => {
    renderLogin("bill@bmail.com", "JMONEY$$1");
  });

  it("should show an error if password doesn't include a special character", async () => {
    renderLogin("bill@bmail.com", "Jmoney111");
  });

  it("should show an error if password is less than 8 characters long", async () => {
    renderLogin("bill@bmail.com", "Money1$");
  });

  //API Tests
  test("handles server error", async () => {
    server.use(
      rest.post("/getUser", (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    render(<BrowserRouter><Login url={url} /></BrowserRouter>);

    const inputEmail = screen.getByPlaceholderText(/Enter email/i) as HTMLInputElement;
    fireEvent.change(inputEmail, { target: { value: "justjohnd@gmail.com" } });

    const inputPassword = screen.getByPlaceholderText(/Enter password/i) as HTMLInputElement;
    fireEvent.change(inputPassword, { target: { value: "Jmoney$$1" } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

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
    // server.use(
    //   rest.post("/getUser", (req, res, ctx) => {
    //     return res(ctx.status(200));
    //   })
    // );

    // Note: this test needs improvement. It should be testing navigation to the home page instead of a message that the user never actually sees.
    render(<BrowserRouter><Login url={url} /></BrowserRouter>);

    const inputEmail = screen.getByPlaceholderText(/Enter email/i) as HTMLInputElement;
    fireEvent.change(inputEmail, { target: { value: "billy@gmail.com" } });

    const inputPassword = screen.getByPlaceholderText(/Enter password/i) as HTMLInputElement;
    fireEvent.change(inputPassword, { target: { value: "Jmoney$$1" } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading-indicator"));

    expect(
      screen.getByText(
        "You did it!"
      )
    ).toBeInTheDocument;

  });
});
