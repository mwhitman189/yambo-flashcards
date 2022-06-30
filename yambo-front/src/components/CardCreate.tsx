import React, { FC, ChangeEvent, useState } from "react";
import styled from "styled-components";

interface Props {
  cardView: string;
}

const CardCreateContainer = styled.div`
  margin: 0 1.25rem;
`;

const Text = styled.p`
  color: #fff;
  text-align: center;
  font-size: 20px;
`;

const Form = styled.form`
  margin: 1.5rem 0;
  color: #fff;
  display: flex;
  justify-content: center;
`;

const FormInput = styled.input`
  width: 10rem;
  height: 2rem;
  margin-right: 0.75rem;
  border-radius: 4px;
  background-color: #ba68c9;
  text-align: center;
  font-size: 20px;
  border: none;
  outline: none;
  padding: 0.25rem;
  color: #fff;
  ::placeholder {
    color: #fff;
  }
  &:focus {
    border: 1px solid #e0bde6;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const ButtonSubmit = styled.button`
  background-color: transparent;
  padding: 0;
  margin: 0;
  border: none;
`;

const SVG = styled.img`
  filter: invert(72%) sepia(77%) saturate(4574%) hue-rotate(241deg) brightness(88%) contrast(76%);
  &:hover {
    filter: invert(87%) sepia(14%) saturate(1075%) hue-rotate(214deg) brightness(96%) contrast(88%);
  }
`;

const CardContainer = styled.div`
  margin: 0 auto;
  display: grid;
  height: 25rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.1fr 1fr;
  grid-template-areas:
    "card-controls card-controls card-controls card-controls card-controls card-controls card-front card-back"
    "card-main card-main card-main card-main card-main card-main card-main card-main";
  column-gap: 8px;
  margin-bottom: 8rem;
  @media (min-width: 576px) {
    max-width: 20rem;
  }
`;

const CardControls = styled.div`
  grid-area: card-controls;
  margin-top: auto;
  margin-left: 20px;
  color: #fff;
  font-size: 18px;
`;

const CardFront = styled.div<Props>`
  grid-area: card-front;
  margin-top: auto;
  color: #fff;
  background-color: ${({ cardView }) => (cardView === "front" ? "#6a6a6a" : "#b3c2c3")};
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  text-align: center;
  padding: 0 1rem;
`;

const CardBack = styled.div<Props>`
  grid-area: card-back;
  margin-top: auto;
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  background-color: ${({ cardView }) => (cardView === "back" ? "#6a6a6a" : "#b3c2c3")};
  text-align: center;
  padding: 0 1rem;
`;

const CardMain = styled.div`
  background-color: #6a6a6a;
  grid-area: card-main;
  color: #fff;
  border-radius: 20px 0 20px 20px;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ICard {
  kanji: string;
  hiragana: string;
  definition: string;
}

const CardCreate: FC = () => {
  const [card, setCard] = useState<ICard>({
    kanji: "",
    hiragana: "",
    definition: ""
  });

  const [cardPlaceholder, setCardPlaceholder] = useState<string>("素晴らしい");

  const [cardView, setCardView] = useState<string>("front");

  const { kanji, hiragana, definition } = card;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value }: any = e.target;
    e.preventDefault();

    setCard((prevValue) => {
      return {
        ...prevValue,
        kanji: value
      };
    });
  };

  const handleSubmit = (): void => {
    setCard({
      kanji: "",
      hiragana: "",
      definition: ""
    });
  };

  console.log(cardView);

  return (
    <CardCreateContainer>
      <Text>Start entering kanji below to generate a new flashcard</Text>
      <Form>
        <FormInput
          name="kanji"
          type="text"
          placeholder="素晴らしい"
          value={kanji}
          onChange={handleChange}
          onClick={(): void => setCardPlaceholder("")}></FormInput>
        <ButtonSubmit onClick={handleSubmit} type="submit">
          <SVG src="./plus-icon.svg"></SVG>
        </ButtonSubmit>
      </Form>
      <CardContainer>
        <CardControls>Preview</CardControls>
        <CardFront cardView={cardView} onClick={(): void => setCardView("front")}>
          front
        </CardFront>
        <CardBack cardView={cardView} onClick={(): void => setCardView("back")}>
          back
        </CardBack>
        <CardMain>
          <div>{kanji || cardPlaceholder}</div>
          <div>{hiragana}</div>
          <div>{definition}</div>
        </CardMain>
      </CardContainer>
    </CardCreateContainer>
  );
};

export default CardCreate;
