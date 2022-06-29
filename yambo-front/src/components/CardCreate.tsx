import React from "react";
import styled from "styled-components";

const Text = styled.p`
  color: #fff;
  text-align: center;
`;

const Form = styled.form`
  color: #fff;
  display: flex;
  justify-content: center;
`;

const CardContainer = styled.div`
  margin: 1rem;
  display: grid;
  height: 10rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.1fr 1fr;
  grid-template-areas:
    "card-controls card-controls card-controls card-controls card-controls card-controls card-front card-back"
    "card-main card-main card-main card-main card-main card-main card-main card-main";
`;

const CardBody = styled.div`
  background-color: #d9d9d9;
`;

function CardCreate() {
  return (
    <>
      <Text>Start entering kanji below to generate a new flashcard</Text>
      <Form>
        <input type="text"></input>
        <button className="btn-submit" type="submit"></button>
      </Form>
      <div className="card-container">
        <div className="card-controls">Preview</div>
        <div className="card-front">front</div>
        <div className="card-back">back</div>
        <div className="card-main">素晴らしい</div>
      </div>
    </>
  );
}

export default CardCreate;
