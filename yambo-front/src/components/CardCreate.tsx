import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

import FormField from "./FormField";
import Header from "./Header";
import Deck from "./Deck";
import ErrorModal from "./ErrorModal";

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
  overflow-x: auto;
  max-width: 100%;
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
  overflow-x: scroll;
`;

const DefinitionSection = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  font-size: 18px;
`;

interface ICard {
  front: string | undefined;
  back: string | undefined;
}

const CardCreate = ({ url }: any) => {
  const [card, setCard] = useState<ICard>({
    front: "",
    back: ""
  });

  const [cardPlaceholder, setCardPlaceholder] = useState<string | undefined>("例");

  const [cardView, setCardView] = useState<string>("front");

  const [error, setError] = useState<string>("");

  const [disableTab, setDisableTab] = useState<boolean>(true);

  const [loader, setLoader] = useState<boolean>(false);

  const [cards, setCards] = useState<ICard[]>([]);

  const { front, back } = card;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();

    const { name, value }: any = e.target;

    setCard((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });

    setDisableTab(false);

    setCardView("back");
  };

  const handleSave = () => {
    if (front) {
      const newCard = card;
      setCards((prevValue) => {
        return [...prevValue, newCard];
      });

      setCard({
        front: "",
        back: ""
      });

      setDisableTab(!disableTab);
      setCardPlaceholder("Add a card...");
      setCardView("front");
    }
  };

  const handleClear = () => {
    setCard({
      front: "",
      back: ""
    });
    setDisableTab(!disableTab);
    setCardPlaceholder("Add a card...");
    setCardView("front");
  };

  function handleLookup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoader(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8"
          },
          body: JSON.stringify({
            query: front,
            language: "English",
            no_english: false
          })
        });

        if (!response.ok) throw new Error();
        const data = await response.json();

        const { words } = data;
        const [word] = words;

        if (word) {
          setLoader(false);
          setCard((prevValue) => {
            return {
              ...prevValue,
              back: `${word.reading.kana}\n${word.senses[0].glosses.join("; ")}`
            };
          });

          setDisableTab(false);

          setCardView("back");
        } else {
          setLoader(false);
          setError("We couldn't find that word. Please try again.");
          setCard({
            front: "",
            back: ""
          });
          setCardPlaceholder("Add a card...");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      } catch (err: any) {
        setLoader(false);
        setError(
          "We couldn't seem to connect to our database. Please check you internet connection."
        );
        setTimeout(() => {
          setError("");
        }, 3000);
        console.error(err.message);
      }
    };
    fetchData();
  }

  return (
    <>
      <Header title="Welcome to Yambo!" />
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
            {error && (
              <ErrorModal error={error}>
              </ErrorModal>
            )}
            <FormField
              fieldType="textarea"
              required={true}
              tabIndex={1}
              name="front"
              labelText="Front"
              placeholder={cardPlaceholder}
              value={front}
              onChange={handleChange}
              onClick={() => setCardPlaceholder("")}></FormField>
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
          <FormField
            fieldType="textarea"
            required={false}
            tabIndex={3}
            name="back"
            labelText="Back"
            placeholder=""
            value={back}
            onChange={handleChange}></FormField>
        </Form>
        <CardContainer>
          <CardControls>
            {front ? (
              <div>
                <CardControlLinks onClick={handleSave}>Add Card</CardControlLinks>
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
              <div>{front || cardPlaceholder}</div>
            </CardTop>
            {cardView === "back" && (
              <CardBottom>
                <Divider></Divider>
                <HiraganaSection>{back?.split("\n")[0]}</HiraganaSection>
                <DefinitionSection>
                  {back && <div data-testid="custom-element">{back?.split("\n")[1]}</div>}
                </DefinitionSection>
              </CardBottom>
            )}
          </CardMain>
        </CardContainer>
        <Deck cards={cards}></Deck>
      </CardCreateContainer>
    </>
  );
};

export default CardCreate;
