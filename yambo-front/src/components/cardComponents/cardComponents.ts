import styled from "styled-components";

interface Props {
  cardView: string;
}

export const CardCreateContainer = styled.div<{ cardView?: string }>`
  margin: 0 1.25rem;
  position: relative;
  padding-bottom: 8rem;
`;

export const CardH1 = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  margin-left: 0.25rem;
  width: 6rem;
  border-radius: 4px;
  border: none;
  background-color: white;
  opacity: 0.5;
`;

export const InputWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  justify-content: end;
  align-items: end;
`;

export const CardContainer = styled.div<{ cardView?: string }>`
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

export const CardControls = styled.div<{ cardView?: string }>`
  grid-area: card-controls;
  margin-top: auto;
  margin-left: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 18px;
  display: flex;
`;

export const CardControlLinks = styled.a`
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  &:hover {
    color: ${({ theme }) => theme.colors.highlightPrimaryLight};
  }
`;

export const CardControlDisabled = styled.a`
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.grayPrimary};
  cursor: default;
`;

export const Pipe = styled.span`
  color: ${({ theme }) => theme.colors.grayPrimary};
  margin: 0 4px;
`;

export const TabFront = styled.button<Props>`
  grid-area: card-front;
  margin-top: auto;
  color: ${({ theme, cardView }) =>
    cardView === "front" ? `${theme.colors.textPrimary}` : `${theme.colors.textSecondary}`};
  background-color: ${({ cardView }) => (cardView === "front" ? "#6a6a6a" : "#b3c2c3")};
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  text-align: center;
  padding: 0 1rem;
`;

export const TabBack = styled.button<Props>`
  grid-area: card-back;
  margin-top: auto;
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  color: ${({ theme, cardView }) =>
    cardView === "back" ? `${theme.colors.textPrimary}` : `${theme.colors.textSecondary}`};
  background-color: ${({ cardView }) => (cardView === "back" ? "#6a6a6a" : "#b3c2c3")};
  text-align: center;
  padding: 0 1rem;
  opacity: ${({ disabled }) => (disabled ? ".2" : "1")};
`;

export const CardMain = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  background-color: ${({ theme }) => theme.colors.grayPrimary};
  grid-area: card-main;
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 20px 0 20px 20px;
  font-size: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  flex: 35%;
  overflow-x: auto;
  max-width: 100%;
`;

export const CardBottom = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 65%;
`;

export const Divider = styled.div`
  width: 60%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.highlightPrimaryLight};
  margin: 1rem;
  border-radius: 4px;
`;

export const HiraganaSection = styled.div`
  margin-bottom: 0.5rem;
  overflow-x: auto;
`;

export const DefinitionSection = styled.div`
  font-size: 18px;
`;
