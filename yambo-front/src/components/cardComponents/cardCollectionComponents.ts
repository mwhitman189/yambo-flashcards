import styled from "styled-components";

export const DeckCollectionWrapper = styled.div`
  background-color: ${({ theme }) => theme?.colors?.inputBackground};
  max-width: 20rem;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
`;

export const DeckCollectionOverlay = styled.div`
  background-color: ${({ theme }) => theme?.colors?.grayPrimary};
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.5;
`;

export const DeckCollectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  box-sizing: border-box;
`;

export const DeckCollectionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const DeckCollectionItem = styled.li`
  display: flex;
  justify-content: space-between;

  svg {
    font-size: 24px;
  }
`;

export const IconWrapper = styled.button`
  width: 20%;
  display: flex;
  justify-content: space-between;

  svg {
    font-size: 24px;
  }
`;

export const IconButton = styled.button`
  background: transparent;
`;

export const DeckCollectionName = styled.div``;

export const NumberOfCards = styled.div``;
