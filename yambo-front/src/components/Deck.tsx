import React, { useState } from "react";
import styled from "styled-components";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DeckWrapper = styled.div<{ theme: { [key: string]: any } }>`
  background-color: ${({ theme }) => theme?.colors?.inputBackground};
  max-width: 20rem;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
`;

const Overlay = styled.div<{ theme: { [key: string]: any } }>`
  background-color: ${({ theme }) => theme?.colors?.grayPrimary};
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: .5;
`;


const DeckHeader = styled.div<{ theme: { [key: string]: any } }>`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  box-sizing: border-box;
`;

const List = styled.ul<{ theme: { [key: string]: any } }>`
  margin: 0;
  padding: 0;
  list-style-type: none;
  `

const Item = styled.li<{ theme: { [key: string]: any } }>`
  display: flex;
  justify-content: space-between;

  svg {
    font-size: 24px;
  }
  `

const IconWrapper = styled.button<{ theme: { [key: string]: any } }>`
  width: 20%;
  display: flex;
  justify-content: space-between;

  svg {
    font-size: 24px;
  }
  `

const IconButton = styled.button<{ theme: { [key: string]: any } }>`
  background: transparent;
  `

const Name = styled.div<{ theme: { [key: string]: any } }>``;

const NumberOfCards = styled.div<{ theme: { [key: string]: any } }>``;

interface ICard {
  front: string | undefined;
  back: string | undefined;
  tempIndex: number | undefined;
}

interface Props {
  cards: ICard[];
  card: ICard;
  setCards: (cards: any) => void;
  setCard: (card: any) => void;
}

const Deck = ({ card, cards, setCards, setCard }: Props) => {
  const handleDelete = (index: number) => {
    setCards((prevCards: ICard[]) => {
      return prevCards.filter((e: any, idx: number) => {
        return idx !== index;
      });
    });
  }

  const handleEdit = (index: number, front: any, back?: any) => {
    setCard(() => {
      return {
        front,
        back,
        tempIndex: index
      }
    })
  }

  console.log(cards);

  return (
    <DeckWrapper>
      {card.tempIndex !== undefined && <Overlay></Overlay>}
      <div>
        <DeckHeader>
          <Name>My Deck</Name>
          <NumberOfCards>{cards.length}</NumberOfCards>
        </DeckHeader>
        <List>
          {cards.map((card, index: number) => {

            const { front, back } = card;
            const frontTruncated = front?.slice(0, 20) + "...";

            return (
              <Item key={index}>
                <div>{frontTruncated}</div>
                <IconWrapper>
                  <IconButton type="button" onClick={() => handleEdit(index, front, back)}><EditIcon></EditIcon></IconButton>
                  <IconButton type="button" onClick={() => handleDelete(index)}>
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </IconWrapper>
              </Item>
            )
          })}
        </List>
      </div>
    </DeckWrapper>
  );
};

export default Deck;
