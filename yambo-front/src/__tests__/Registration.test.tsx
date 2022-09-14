import { render } from "@testing-library/react";
import Registration from "../pages/Registration";
import { BrowserRouter } from "react-router-dom";
import validationTest from "../helpers/validationTest";

describe("Registration", () => {

    const renderReg = (email?: string, password?: string, confirm?: string) => {
    render(<BrowserRouter><Registration /></BrowserRouter>);
    validationTest(email, password, confirm);
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
});
