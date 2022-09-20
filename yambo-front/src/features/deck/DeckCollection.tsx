import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ICard } from "../../types/deckCardTypes";
import {
  DeckCollectionWrapper,
  DeckCollectionOverlay,
  DeckCollectionHeader,
  DeckCollectionName,
  NumberOfCards,
  DeckCollectionList,
  DeckCollectionItem,
  IconWrapper,
  IconButton
} from "../../components/cardComponents/cardCollectionComponents";

interface Props {
  cards: ICard[];
  card: ICard;
  setCards: (cards: any) => void;
  setCard: (card: any) => void;
}

const DeckCollection = ({ card, cards, setCards, setCard }: Props) => {
  const handleDelete = (index: number) => {
    setCards((prevCards: ICard[]) => {
      return prevCards.filter((e: any, idx: number) => {
        return idx !== index;
      });
    });
  };

  const handleEdit = (index: number, front: any, back?: any) => {
    setCard(() => {
      return {
        front,
        back,
        tempIndex: index
      };
    });
  };

  console.log(cards);

  return (
    <DeckCollectionWrapper>
      {card?.tempIndex !== undefined && <DeckCollectionOverlay></DeckCollectionOverlay>}
      <div>
        <DeckCollectionHeader>
          <DeckCollectionName>My Deck</DeckCollectionName>
          <NumberOfCards>{cards.length}</NumberOfCards>
        </DeckCollectionHeader>
        <DeckCollectionList>
          {cards.map((card, index: number) => {
            const { front, back } = card;
            const frontTruncated = front?.slice(0, 20) + "...";

            return (
              <DeckCollectionItem key={index}>
                <div>{frontTruncated}</div>
                <IconWrapper>
                  <IconButton type="button" onClick={() => handleEdit(index, front, back)}>
                    <EditIcon></EditIcon>
                  </IconButton>
                  <IconButton type="button" onClick={() => handleDelete(index)}>
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </IconWrapper>
              </DeckCollectionItem>
            );
          })}
        </DeckCollectionList>
      </div>
    </DeckCollectionWrapper>
  );
};

export default DeckCollection;
