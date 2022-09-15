//Use this function inside Registration, Login, etc. pages for front side form validation

import { screen, fireEvent } from "@testing-library/react";

export default function validationTest(buttonText: string, email: string | undefined, password?: string | undefined, confirmPassword?: string) {
  const inputEmail = screen.getByPlaceholderText(/Enter email/i) as HTMLInputElement;
  fireEvent.change(inputEmail, { target: { value: email } });

  const inputPassword = screen.getByPlaceholderText(/Enter Password/i) as HTMLInputElement;
  fireEvent.change(inputPassword, { target: { value: password } });

  if (confirmPassword) {
    const inputConfirmPassword = screen.getByPlaceholderText(/Confirm Password/i) as HTMLInputElement;
    fireEvent.change(inputConfirmPassword, { target: { value: confirmPassword } });
  }

  const submitButton = screen.getByRole('button', { name: buttonText }) as HTMLButtonElement;
  fireEvent.click(submitButton);
  const errorMessage = screen.getByTestId("error-message");
  expect(errorMessage).toBeTruthy();
}
