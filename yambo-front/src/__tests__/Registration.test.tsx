import { render, screen, fireEvent } from "@testing-library/react";
import Registration from "../pages/Registration";
import { BrowserRouter } from "react-router-dom";

describe("Registration", () => {

  function validationTest(email: string, password?: string, confirmPassword?: string) {
    render(<BrowserRouter><Registration /></BrowserRouter>);
    const inputEmail = screen.getByPlaceholderText(/Enter email/i) as HTMLInputElement;
    fireEvent.change(inputEmail, { target: { value: email } });

    const inputPassword = screen.getByPlaceholderText(/Enter Password/i) as HTMLInputElement;
    const inputConfirmPassword = screen.getByPlaceholderText(/Confirm Password/i) as HTMLInputElement;
    fireEvent.change(inputPassword, { target: { value: password } });
    fireEvent.change(inputConfirmPassword, { target: { value: confirmPassword } });

    fireEvent.click(screen.getByText("Submit"));
    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeTruthy();
  }

  it("should show an error if email is invalid", async () => {
    validationTest("bill.com");
  });

  it("should show an error if passwords don't match", async () => {
    validationTest("bill@bmail.com", "Jmoney$$1", "bladdyblah$$1");
  });

  it("should show an error if password doesn't include a number", async () => {
    validationTest("bill@bmail.com", "Jmoney$$$", "Jmoney$$$");
  });

  it("should show an error if password doesn't include an uppercase letter", async () => {
    validationTest("bill@bmail.com", "jmoney$$1", "jmoney$$1");
  });

  it("should show an error if password doesn't a lowercase letter", async () => {
    validationTest("bill@bmail.com", "JMONEY$$1", "JMONEY$$1");
  });

  it("should show an error if password doesn't include a special character", async () => {
    validationTest("bill@bmail.com", "Jmoney111", "Jmoney111");
  });

  it("should show an error if password is less than 8 characters long", async () => {
    validationTest("bill@bmail.com", "Money1$", "Money1$");
  });
});
