import { render } from "@testing-library/react";
import Login from "../pages/Registration";
import { BrowserRouter } from "react-router-dom";
import validationTest from "../helpers/validationTest";

describe("Login", () => {

  const renderLogin = (email?: string, password?: string) => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    validationTest(email, password);
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
});
