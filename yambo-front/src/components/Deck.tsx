import React from "react";
import styled from "styled-components";

const DeckContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 20rem;
  margin: 0 auto;
  background-color: #fff;
  padding: 1rem;
  font-size: 18px;
  margin-bottom: 8rem;
  box-sizing: border-box;
`;

const Name = styled.div``;

const NumberOfCards = styled.div``;

interface ICard {
  kanji: string | undefined;
  hiragana: string | undefined;
  definition: string | undefined;
}

interface Props {
  cards: ICard[];
}

const Deck = ({ cards }: Props) => {
  return (
    <DeckContainer>
      <Name>My Deck</Name>
      <NumberOfCards>{cards.length}</NumberOfCards>
    </DeckContainer>
  );
};

export default Deck;
