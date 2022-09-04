import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import CardCreate from "../components/CardCreate";
import { MOCK_DATA } from "../mocks/MOCK_DATA";

//Set up msw server
const server = setupServer(
  rest.post("/getDefinition", (req, res, ctx) => {
    // console.log(res(ctx.json(MOCK_DATA)));
    return res(ctx.json(MOCK_DATA));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const url = "/getDefinition";

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
    color: GrayText;
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
    color: ButtonText;
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

  it("should change 'Preview' to 'Save | Clear' when anything is typed into the input", async () => {
    render(<CardCreate />);
    const inputElement = screen.getByPlaceholderText(/例/i) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "偉い" } });
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });

  it("should change 'Save | Clear' to 'Preview' when the input is empty", async () => {
    render(<CardCreate />);
    const inputElement = screen.getByPlaceholderText(/例/i) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "" } });
    expect(screen.getByText(/Preview/i)).toBeInTheDocument();
  });

  //API tests
  it("add and display the definition to the back of the card", async () => {
    render(<CardCreate url={url} />);

    fireEvent.click(screen.getByText("Auto-Generate"));

    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading-indicator"));

    expect(screen.getByTestId("custom-element")).toHaveTextContent(
      "great; excellent; admirable; remarkable; distinguished; important; celebrated; famous; eminent"
    );
  });

  test("handles server error", async () => {
    server.use(
      rest.post("/getDefinition", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<CardCreate url={url} />);

    fireEvent.click(screen.getByText("Auto-Generate"));

    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading-indicator"));

    expect(
      screen.getByText(
        "We couldn't seem to connect to our database. Please check you internet connection."
      )
    ).toBeInTheDocument;
  });
});
