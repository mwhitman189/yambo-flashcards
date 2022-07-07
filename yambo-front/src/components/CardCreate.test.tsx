import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardCreate from "./CardCreate";

describe("CardCreate", () => {
  it("should render input element", async () => {
    render(<CardCreate />);
  });

  // it("should show back side of card when a definition is retrieved", async () => {
  //   render(<CardCreate />);
  //   const btnSubmit = await screen.findByLabelText(/submit/);
  //   const btnBackInitial = await screen.findByText(/back/);
  //   // expect(btnBackInitial).toHaveStyle(`
  //   // grid-area: card-back;
  //   // margin-top: auto;
  //   // font-size: 18px;
  //   // border-radius: 4px 4px 0 0;
  //   // color: #000;
  //   // background-color: #b3c2c3;
  //   // text-align: center;
  //   // padding: 0 1rem;
  //   // opacity: .2;
  //   // `);

  //   // const btnBackClicked = screen.getByText(/back/);
  //   // const user = await userEvent.setup();
  //   // await user.click(btnSubmit);
  //   // expect(btnBackClicked).toHaveProperty("disabled", false);
  // });
});
