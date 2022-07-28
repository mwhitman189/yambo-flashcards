import React, { FC, ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

import Deck from "./Deck";

interface Props {
  cardView: string;
}

interface FontSize {
  fontSize: string;
}

const CardCreateContainer = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  margin: 0 1.25rem;
  position: relative;
  padding-bottom: 8rem;
`;

const NotFoundMessage = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  position: absolute;
  width: 100%;
  padding: 1.5rem;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme?.colors?.grayPrimary};
  color: ${({ theme }) => theme?.colors?.textPrimary};
  border: 2px solid;
  border-color: ${({ theme }) => theme?.colors?.highlightPrimary};
  border-radius: 8px;
  text-align: center;
  z-index: 10;
`;

const NotFoundHeader = styled.h2`
  margin: 0;
`;

const Text = styled.p`
  color: ${({ theme }) => theme?.colors?.textPrimary};
  text-align: center;
  font-size: 20px;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  position: relative;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme?.colors?.inputBackground};
  @media (min-width: 576px) {
    max-width: 20rem;
    margin: 1.5rem auto 3rem auto;
  }
`;

const Label = styled.label`
  font-size: "18px";
`;

const Input = styled.input`
  margin-left: 0.25rem;
  width: 6rem;
  border-radius: 4px;
  border: none;
  background-color: ${({ theme }) => theme?.colors?.colorWhite};
  opacity: 0.5;
`;

const InputWrapper = styled.div`
  color: ${({ theme }) => theme?.colors?.textPrimary};
  display: flex;
  justify-content: end;
  align-items: end;
  margin-bottom: 1rem;
`;

const FormTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  padding-left: 0.75rem;
  border-radius: 4px;
  text-align: left;
  outline: none;
  color: ${({ theme }) => theme?.colors?.textSecondary};
  background-color: ${({ theme }) => theme?.colors?.inputBackground};
  font-size: 20px;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  ::placeholder {
    color: ${({ theme }) => theme?.colors?.textSecondary};
    opacity: 0.5;
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme?.colors?.highlightPrimaryLight};
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const Button = styled.button<FontSize>`
  border-radius: 4px;
  background-color: ${({ theme }) => theme?.colors?.highlightSecondary};
  text-align: center;
  font-size: ${({ fontSize }) => fontSize};
  border: none;
  outline: none;
  padding: 0.25rem 0.75rem;
  color: ${({ theme }) => theme?.colors?.inputBackground};
  &:focus,
  &:hover {
    background-color: #1fdb77;
    color: ${({ theme }) => theme?.colors?.grayPrimary};
  }
`;

const CardContainer = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
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

const CardControls = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  grid-area: card-controls;
  margin-top: auto;
  margin-left: 20px;
  color: ${({ theme }) => theme?.colors?.textPrimary};
  font-size: 18px;
`;

const CardControlLinks = styled.a`
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme?.colors?.textPrimary};
  &:hover {
    color: ${({ theme }) => theme?.colors?.highlightPrimaryLight};
  }
`;

const Pipe = styled.span`
  color: ${({ theme }) => theme?.colors?.grayPrimary};
`;

const TabFront = styled.button<Props>`
  grid-area: card-front;
  margin-top: auto;
  color: ${({ theme, cardView }) =>
    cardView === "front" ? `${theme?.colors?.textPrimary}` : `${theme?.colors?.textSecondary}`};
  background-color: ${({ cardView }) => (cardView === "front" ? "#6a6a6a" : "#b3c2c3")};
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  text-align: center;
  padding: 0 1rem;
`;

const TabBack = styled.button<Props>`
  grid-area: card-back;
  margin-top: auto;
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  color: ${({ theme, cardView }) =>
    cardView === "back" ? `${theme?.colors?.textPrimary}` : `${theme?.colors?.textSecondary}`};
  background-color: ${({ cardView }) => (cardView === "back" ? "#6a6a6a" : "#b3c2c3")};
  text-align: center;
  padding: 0 1rem;
  opacity: ${({ disabled }) => (disabled ? ".2" : "1")};
`;

const CardMain = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  background-color: ${({ theme }) => theme?.colors?.grayPrimary};
  grid-area: card-main;
  color: ${({ theme }) => theme?.colors?.textPrimary};
  border-radius: 20px 0 20px 20px;
  font-size: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const CardTop = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  display: flex;
  align-items: center;
  flex: 35%;
`;

const CardBottom = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 65%;
`;

const Divider = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  width: 60%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme?.colors?.highlightPrimaryLight};
  margin: 1rem;
  border-radius: 4px;
`;

const HiraganaSection = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  margin-bottom: 0.5rem;
`;

const DefinitionSection = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  font-size: 18px;
`;

interface ICard {
  kanji: string | undefined;
  hiragana: string | undefined;
  definition: string | undefined;
}

const CardCreate: FC = () => {
  const [card, setCard] = useState<ICard>({
    kanji: "",
    hiragana: "",
    definition: ""
  });

  const [cardPlaceholder, setCardPlaceholder] = useState<string | undefined>("例");

  const [cardView, setCardView] = useState<string>("front");

  const [wordNotFound, setWordNotFound] = useState<boolean>(false);

  const [disableTab, setDisableTab] = useState<boolean>(true);

  const [loader, setLoader] = useState<boolean>(false);

  const [cards, setCards] = useState<ICard[]>([]);

  const { kanji, hiragana, definition } = card;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();

    const { name, value }: any = e.target;

    setCard((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });

    if (value) {
      setDisableTab(false);
    } else {
      setDisableTab(true);
    }

    setCardView("back");
  };

  const handleSave = () => {
    if (kanji) {
      const newCard = card;
      setCards((prevValue) => {
        return [...prevValue, newCard];
      });

      setCard({
        kanji: "",
        hiragana: "",
        definition: ""
      });

      setDisableTab(!disableTab);
      setCardPlaceholder("Add a card...");
      setCardView("front");
    }
  };

  const handleClear = () => {
    setCard({
      kanji: "",
      hiragana: "",
      definition: ""
    });
    setDisableTab(!disableTab);
    setCardPlaceholder("Add a card...");
    setCardView("front");
  };

  function handleLookup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoader(true);

    try {
      //Use for actual api call
      const fetchData = async () => {
        const response = await fetch("https://jotoba.de/api/search/words", {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8"
          },
          body: JSON.stringify({
            query: kanji,
            language: "English",
            no_english: false
          })
        });
        const data = await response.json();

        const { words } = data;
        const [word] = words;

        if (word) {
          setTimeout(() => {
            setLoader(false);
            setCard((prevValue) => {
              return {
                ...prevValue,
                hiragana: word.reading.kana,
                definition: word.senses[0].glosses.join("; ")
              };
            });

            setDisableTab(false);

            setCardView("back");
          }, 3000);
        } else {
          setLoader(false);
          setWordNotFound(true);
          setCard({
            kanji: "",
            hiragana: "",
            definition: ""
          });
          setCardPlaceholder("Add a card...");
          setTimeout(() => {
            setWordNotFound(false);
          }, 3000);
        }
      };

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
      //       setCardPlaceholder("Add a card...");
      //       setCardView("front");
      //     }, 3000);
      //   }
      // };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CardCreateContainer>
      {loader && (
        <div>
          <div className="loader">
            <TailSpin color={"#e0bde6"} ariaLabel="loading-indicator" />
          </div>
        </div>
      )}
      <Text>Enter kanji to look up a word, or add your own definition:</Text>
      <Form onSubmit={handleLookup}>
        <InputWrapper>
          <label className="font-14">Deck:</label>
          <Input></Input>
        </InputWrapper>
        <div className="position-relative">
          {wordNotFound && (
            <NotFoundMessage>
              <NotFoundHeader>ゴメンね</NotFoundHeader>
              <div>We couldn&apos;t find that word. Please try again.</div>
            </NotFoundMessage>
          )}
          <Label>Front</Label>
          <FormTextArea
            rows={3}
            tabIndex={1}
            required
            name="kanji"
            placeholder={cardPlaceholder}
            value={kanji}
            onChange={handleChange}
            onClick={() => setCardPlaceholder("")}></FormTextArea>
        </div>
        <InputWrapper>
          <Button fontSize="14px" type="submit">
            Auto-Generate
          </Button>
          <div className="set-checkbox">
            <input type="checkbox" id="set-auto-generate" name="set-auto-generate"></input>
            <label className="font-14" htmlFor="set-auto-generate">
              Set
            </label>
          </div>
        </InputWrapper>
        <Label className="d-block">Back</Label>
        <FormTextArea
          rows={3}
          tabIndex={2}
          name="definition"
          placeholder=""
          value={definition}
          onChange={handleChange}></FormTextArea>
      </Form>
      <CardContainer>
        <CardControls>
          {kanji ? (
            <div>
              <CardControlLinks onClick={handleSave}>Save</CardControlLinks>
              <Pipe> | </Pipe>
              <CardControlLinks onClick={handleClear}>Clear</CardControlLinks>
            </div>
          ) : (
            "Preview"
          )}
        </CardControls>
        <TabFront tabIndex={3} cardView={cardView} onClick={() => setCardView("front")}>
          front
        </TabFront>
        <TabBack
          tabIndex={4}
          disabled={disableTab}
          cardView={cardView}
          onClick={() => setCardView("back")}>
          back
        </TabBack>
        <CardMain>
          <CardTop>
            <div>{kanji || cardPlaceholder}</div>
          </CardTop>
          {cardView === "back" && (
            <CardBottom>
              <Divider></Divider>
              <HiraganaSection>{hiragana}</HiraganaSection>
              <DefinitionSection>{definition}</DefinitionSection>
            </CardBottom>
          )}
        </CardMain>
      </CardContainer>
      <Deck cards={cards}></Deck>
    </CardCreateContainer>
  );
};

export default CardCreate;
