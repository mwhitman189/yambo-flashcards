import React from "react";
import styled from "styled-components";

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

const CardFront = styled.div`
  grid-area: card-front;
  margin-top: auto;
  color: #fff;
  background-color: #6a6a6a;
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  text-align: center;
  padding: 0 1rem;
`;

const CardBack = styled.div`
  grid-area: card-back;
  margin-top: auto;
  font-size: 18px;
  border-radius: 4px 4px 0 0;
  background-color: #b3c2ce;
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

function CardCreate() {
  return (
    <CardCreateContainer>
      <Text>Start entering kanji below to generate a new flashcard</Text>
      <Form>
        <FormInput type="text" placeholder="素晴らしい"></FormInput>
        <ButtonSubmit type="submit">
          <SVG src="./plus-icon.svg"></SVG>
        </ButtonSubmit>
      </Form>
      <CardContainer>
        <CardControls>Preview</CardControls>
        <CardFront>front</CardFront>
        <CardBack>back</CardBack>
        <CardMain>素晴らしい</CardMain>
      </CardContainer>
    </CardCreateContainer>
  );
}

export default CardCreate;
