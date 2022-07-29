import React, { FC, ChangeEvent, MouseEvent, useState } from "react";
import styled from "styled-components";

import Deck from "./Deck";

interface Props {
  cardView?: boolean;
}

const colorPrimary = "#ba68c9";
const colorSecondary = "#e0bde6";
const colorDark = "#6a6a6a";
const colorWhite = "#f7f7f7";

const CardCreateContainer = styled.div`
  margin: 0 1.25rem;
  position: relative;
`;

const NotFoundMessage = styled.div`
  position: absolute;
  width: 80%;
  padding: 1.5rem;
  background-color: ${colorWhite};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  text-align: center;
`;

const NotFoundHeader = styled.h2`
  margin: 0;
`;

const Text = styled.p`
  color: ${colorWhite};
  text-align: center;
  font-size: 20px;
`;

const Form = styled.form`
  margin: 1.5rem 0;
  color: ${colorWhite};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormInput = styled.input`
  width: 10rem;
  height: 2rem;
  margin-right: 0.75rem;
  border-radius: 4px;
  background-color: ${colorPrimary};
  text-align: center;
  font-size: 20px;
  border: none;
  outline: none;
  padding: 0.25rem;
  color: ${colorWhite};
  ::placeholder {
    color: ${colorWhite};
    opacity: 0.5;
  }
  &:focus {
    border: 1px solid ${colorSecondary};
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const CardInputTextArea = styled.textarea`
  width: 320px;
  height: 100px;
  border-radius: 0.25rem;
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
  min-height: 30rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "card-controls card-controls card-controls card-controls card-controls card-controls card-front card-back"
    "card-main card-main card-main card-main card-main card-main card-main card-main";
  column-gap: 8px;
  margin-bottom: 4rem;
  @media (min-width: 576px) {
    max-width: 20rem;
  }
`;

const CardControls = styled.div`
  grid-area: card-controls;
  margin-top: auto;
  margin-left: 20px;
  color: ${colorWhite};
  font-size: 18px;
`;

const CardControlLinks = styled.a`
  text-decoration: none;
  font-weight: 600;
  color: ${colorWhite};
  &:hover {
    color: ${colorSecondary};
  }
`;

const Pipe = styled.span`
  color: ${colorDark};
`;

const TabFront = styled.button<Props>`
  grid-area: card-front;
  margin-top: auto;
  color: ${({ cardView }) => (cardView ? `${colorWhite}` : "#000")};
  background-color: ${({ cardView }) => (cardView ? "#6a6a6a" : "#b3c2c3")};
  transition: 0.2s;
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  text-align: center;
  padding: 0 1rem;
`;

const TabBack = styled.button<Props>`
  grid-area: card-back;
  margin-top: auto;
  transition: 0.2s;
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  color: ${({ cardView }) => (!cardView ? `${colorWhite}` : "#000")};
  background-color: ${({ cardView }) => (!cardView ? "#6a6a6a" : "#b3c2c3")};
  text-align: center;
  padding: 0 1rem;
  opacity: ${({ disabled }) => (disabled ? ".2" : "1")};
`;

const CardMain = styled.div`
  background-color: ${colorDark};
  grid-area: card-main;
  color: ${colorWhite};
  border-radius: 1rem 0 1rem 0;
  font-size: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  flex: 35%;
`;

const CardBottom = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 65%;
`;

const Divider = styled.div`
  width: 60%;
  height: 0.1rem;
  background-color: #e0bde6;
  margin: 1rem;
  border-radius: 4px;
`;

const HiraganaSection = styled.div`
  margin-bottom: 0.5rem;
`;

const DefinitionSection = styled.div`
  font-size: 18px;
`;

interface ICard {
  front: string;
  back: string;
}

const CardCreate: FC = () => {
  const [card, setCard] = useState<ICard>({
    front: "",
    back: ""
  });
  const [viewFrontCard, setViewFrontCard] = useState<boolean>(true);
  // const [wordNotFound, setWordNotFound] = useState<boolean>(false);
  // const [disableTab, setDisableTab] = useState<boolean>(true);
  const [cards, setCards] = useState<ICard[]>([]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    setCard((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  function handleSubmit(e: MouseEvent) {
    e.preventDefault();

    // try {
    //   //Use for actual api call
    //   const fetchData = async () => {
    //     const response = await fetch("https://jotoba.de/api/search/words", {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json;charset=UTF-8"
    //       },
    //       body: JSON.stringify({
    //         query: kanji,
    //         language: "English",
    //         no_english: false
    //       })
    //     });
    //     const data = await response.json();

    //     const { words } = data;
    //     const [word] = words;

    //     if (word) {
    //       setCard((prevValue) => {
    //         return {
    //           ...prevValue,
    //           hiragana: word.reading.kana,
    //           definition: word.senses[0].glosses
    //         };
    //       });
    //     } else {
    //       setWordNotFound(true);

    //       setCard({
    //         kanji: "",
    //         hiragana: "",
    //         definition: ""
    //       });

    //       setTimeout(() => {
    //         setWordNotFound(false);
    //         setCardPlaceholder("Add another card...");
    //         setCardView("front");
    //       }, 3000);
    //     }
    //   };

    //Use for manually testing the front end without calling the api
    // const fetchData = async () => {
    //   const response = await fetch("./MOCK_DATA.json");
    //   const data = await response.json();

    //   const { words } = data;
    //   let foundWord = false;

    //   for (const word of words) {
    //     if (kanji === word.kanji) {
    //       setCard((prevValue) => {
    //         return {
    //           ...prevValue,
    //           hiragana: word.hiragana,
    //           definition: word.definition
    //         };
    //       });

    //       foundWord = true;
    //       setDisableTab(false);
    //       setCardView("back");
    //       break;
    //     }
    //   }

    //   if (!foundWord) {
    //     setWordNotFound(true);

    //     setCard({
    //       kanji: "",
    //       hiragana: "",
    //       definition: ""
    //     });

    //     setTimeout(() => {
    //       setWordNotFound(false);
    //       setCardPlaceholder("Add another card...");
    //       setCardView("front");
    //     }, 3000);
    //   }
    // };

    //   fetchData();
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <CardCreateContainer>
      {/* {wordNotFound && (
        <NotFoundMessage>
          <NotFoundHeader>ゴメンね</NotFoundHeader>
          <div>We couldn&apos;t find that word. Please try again.</div>
        </NotFoundMessage>
      )} */}
      <Text>Enter kanji to look up a word, or add your own definition:</Text>
      <Form>
        <CardInputTextArea
          name="front"
          value={card.front}
          placeholder="Enter text for front of card..."
          onChange={handleChange}></CardInputTextArea>
        <div>
          <button>Auto-gen</button>
          <input type="checkbox" name="set" />
          <label htmlFor="set">Set?</label>
        </div>
        <CardInputTextArea
          name="back"
          value={card.back}
          placeholder="Enter text for back of card..."
          onChange={handleChange}></CardInputTextArea>
        <ButtonSubmit onClick={handleSubmit} aria-label="submit" type="submit">
          <SVG src="./plus-icon.svg"></SVG>
        </ButtonSubmit>
      </Form>
      <CardContainer>
        <TabFront tabIndex={2} cardView={viewFrontCard} onClick={() => setViewFrontCard(true)}>
          Front
        </TabFront>
        <TabBack tabIndex={3} cardView={viewFrontCard} onClick={() => setViewFrontCard(false)}>
          Back
        </TabBack>
        <CardMain>
          {/* <CardTop>
            <div>{card.front}</div>
          </CardTop>
          {cardView === "back" && (
            <CardBottom>
              <Divider></Divider>
              <HiraganaSection>{hiragana}</HiraganaSection>
              <DefinitionSection>{definition}</DefinitionSection>
            </CardBottom>
          )} */}
        </CardMain>
      </CardContainer>
    </CardCreateContainer>
  );
};

export default CardCreate;
