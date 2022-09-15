import React from "react";
import styled from "styled-components";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DeckWrapper = styled.div<{ theme: { [key: string]: any } }>`
  background-color: ${({ theme }) => theme?.colors?.inputBackground};
    max-width: 20rem;
  margin: 0 auto;
  padding: 1rem;
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

const IconWrapper = styled.div<{ theme: { [key: string]: any } }>`
  width: 20%;
  display: flex;
  justify-content: space-between;

  svg {
    font-size: 24px;
  }
  `

const Name = styled.div<{ theme: { [key: string]: any } }>``;

const NumberOfCards = styled.div<{ theme: { [key: string]: any } }>``;

interface ICard {
  front: string | undefined;
  back: string | undefined;
}

interface Props {
  cards: ICard[];
}

const Deck = ({ cards }: Props) => {
  return (
    <DeckWrapper>

      <DeckHeader>
        <Name>My Deck</Name>
        <NumberOfCards>{cards.length}</NumberOfCards>
      </DeckHeader>
      <List>
        {cards.map((card, index) => {

          const { front } = card;
          const frontTruncated = front?.slice(0, 20) + "...";

          return (
            <Item key={index}>
              <div>{frontTruncated}</div>
              <IconWrapper>
                <EditIcon></EditIcon>
                <DeleteIcon></DeleteIcon>
              </IconWrapper>
            </Item>
          )
        })}
      </List>
    </DeckWrapper>
  );
};

export default Deck;
