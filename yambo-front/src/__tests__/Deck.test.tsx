import React from "react";
import { render, screen } from "@testing-library/react";
import Deck from "../features/deck/Deck";

const mockData = [
  {
    kanji: "偉い",
    hiragana: "えらい",
    definition:
      "great; excellent; admirable; remarkable; distinguished; important; celebrated; famous; eminent"
  },
  {
    kanji: "素晴らしい",
    hiragana: "すばらしい",
    definition: "wonderful; splendid; magnificent"
  },
  {
    kanji: "最高",
    hiragana: "さいこう",
    definition: "best; supreme; wonderful; finest"
  }
];

it("should render the number of cards in the deck", async () => {
  render(<Deck cards={mockData} />);
  const divElement = screen.getByText(/3/);
  expect(divElement).toBeInTheDocument();
});
