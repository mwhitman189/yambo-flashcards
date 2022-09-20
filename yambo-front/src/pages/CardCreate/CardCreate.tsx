import React, { ChangeEvent, FormEvent, useState } from "react";
import { TailSpin } from "react-loader-spinner";

import FormField from "../../components/forms/FormField";
import Deck from "../../components/Deck";
import ErrorModal from "../../features/modals/error/ErrorModal";
import {
  Button,
  CardBottom,
  CardContainer,
  CardControlDisabled,
  CardControlLinks,
  CardControls,
  CardCreateContainer,
  CardMain,
  CardTop,
  DefinitionSection,
  Divider,
  Form,
  HiraganaSection,
  Input,
  InputWrapper,
  Pipe,
  TabBack,
  TabFront,
  Text
} from "../../components/cardComponents/cardComponents";

interface ICard {
  front: string | undefined;
  back: string | undefined;
  tempIndex: number | undefined;
}

const CardCreate = ({ url }: any) => {
  const [card, setCard] = useState<ICard>({
    front: "",
    back: "",
    tempIndex: undefined
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
    //Handle cards pulled from the deck to be edited
    if (card.tempIndex !== undefined) {
      const cardsClone = [...cards];
      cardsClone.splice(card.tempIndex, 1, card);
      setCards(cardsClone);
      setCard({
        front: "",
        back: "",
        tempIndex: undefined
      });
      return;
    }

    if (front) {
      const newCard = card;
      setCards((prevValue) => {
        return [...prevValue, newCard];
      });
      setCard({
        front: "",
        back: "",
        tempIndex: undefined
      });
      setDisableTab(!disableTab);
      setCardPlaceholder("Add a card...");
      setCardView("front");
    }
  };

  const handleClear = () => {
    //Handle cards pulled from the deck to be edited
    if (card.tempIndex !== undefined) {
      setCards((prevCards: ICard[]) => {
        return prevCards.filter((e: any, idx: number) => {
          return idx !== card.tempIndex;
        });
      });
    }
    setCard({
      front: "",
      back: "",
      tempIndex: undefined
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
            back: "",
            tempIndex: undefined
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

  console.log(card);

  return (
    <>
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
            {error && <ErrorModal error={error}></ErrorModal>}
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
                <CardControlLinks onClick={handleSave}>
                  {card.tempIndex !== undefined ? "Save" : "Add Card"}
                </CardControlLinks>
                <Pipe> | </Pipe>
                <CardControlLinks onClick={handleClear}>
                  {card.tempIndex !== undefined ? "Delete" : "Clear"}
                </CardControlLinks>
              </div>
            ) : card.tempIndex !== undefined ? (
              <div>
                <CardControlDisabled>Save</CardControlDisabled>
                <Pipe> | </Pipe>
                <CardControlLinks onClick={handleClear}>Delete</CardControlLinks>
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
        <Deck card={card} setCard={setCard} setCards={setCards} cards={cards}></Deck>
      </CardCreateContainer>
    </>
  );
};

export default CardCreate;
