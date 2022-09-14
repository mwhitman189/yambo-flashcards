//Use this function inside Registration, Login, etc. pages for front side form validation

import { screen, fireEvent } from "@testing-library/react";

export default function validationTest(email: string | undefined, password?: string | undefined, confirmPassword?: string) {
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
