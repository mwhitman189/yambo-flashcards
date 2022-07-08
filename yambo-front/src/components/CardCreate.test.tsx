import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardCreate from "./CardCreate";

describe("CardCreate", () => {
  //Initial State tests

  //This test should be dyncamic and actually find the placeholder text, set it as a variable and check to see if that variable matches cardText
  it("should show the placeholder text in the center of the card", async () => {
    render(<CardCreate />);
    const cardText = screen.getByText(/例/i);
    expect(cardText).toBeInTheDocument();
  });

  it("should have the back button disabled", async () => {
    render(<CardCreate />);
    const btnBackInitial = screen.getByRole("button", { name: "back" });
    expect(btnBackInitial).toHaveProperty("disabled", true);
  });

  it("should check the initial styling of the back button", async () => {
    render(<CardCreate />);
    const btnBackInitial = await screen.findByText(/back/);
    expect(btnBackInitial).toHaveStyle(`
    grid-area: card-back;
    margin-top: auto;
    font-size: 18px;
    border-radius: 4px 4px 0 0;
    color: #000;
    background-color: #b3c2c3;
    text-align: center;
    padding: 0 1rem;
    opacity: .2;
    `);
  });

  it("should check the initial styling of the front button", async () => {
    render(<CardCreate />);
    const btnFrontInitial = screen.getByRole("button", { name: "front" });
    expect(btnFrontInitial).toHaveStyle(`
    grid-area: card-front;
    margin-top: auto;
    font-size: 18px;
    border-radius: 4px 4px 0 0;
    color: #f7f7f7;
    background-color: #6a6a6a;
    text-align: center;
    padding: 0 1rem;
    `);
  });

  //Input Button Funcitonality
  it("should show the input value as it is typed", async () => {
    render(<CardCreate />);
    const inputElement = screen.getByPlaceholderText(/例/i) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "偉い" } });
    expect(inputElement.value).toBe("偉い");
  });

  

  // it("should enable the back tab when a word is retrieved", async () => {
  //   render(<CardCreate />);
  //   const btnSubmit = await screen.findByLabelText(/submit/);
  //   const btnBackClicked = screen.findByText(/back/i);
  //   const user = userEvent.setup();
  //   await user.click(btnSubmit);
  //   expect(btnBackClicked).toHaveProperty("disabled", false);
  // });
});
