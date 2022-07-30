const Deck = require("../models/deckModel");
const Card = require("../models/cardModel");
const User = require("../models/userModel");

const batchCardCreate = async (cardArray, deckId, userId) => {
  let cardIdArray = [];
  for (let i = 0; i < cardArray.length; i++) {
    const newCard = await new Card({
      front: cardArray[i].front,
      back: cardArray[i].back,
      user: userId,
      deck: deckId,
    });
    await newCard.save(req, res);
    cardIdArray.push(newCard._id);
  }
  return cardIdArray;
};

const cardCreate = async () => {
  const { deckId, card } = req.body;
  const userId = req.user._id;
  try {
    const newCard = await new Card({
      front: card.front,
      back: card.back,
      user: userId,
      deck: deckId,
    });
    if (!newCard) {
      return res.status(409).send({ error: "Error making card" });
    }
    await newCard.save();

    const deck = await Deck.findOne({ deckId });
    await deck.cards.push(newCard);
    await deck.save();

    res.status(201).send(deck);
  } catch (e) {
    res.status(400).send({ error: "Error creating card" });
  }
};

const cardCreateBatch = async () => {
  const { deckId, cards } = req.body;
  const userId = req.user._id;
  try {
    const newCards = await batchCardCreate(cards, deckId, userId);
    if (!newCards) {
      return res.status(409).send({ error: "Error making cards" });
    }
    const deck = await Deck.findOne({ deckId });
    await deck.cards.push(newCards);
    await deck.save();

    for (i of newCards) {
      const foundCard = await Card.findById(i);
      foundCard.deck = deck._id;
      await foundCard.save();
    }

    res.status(201).send(deck);
  } catch (e) {
    res.status(400).send({ error: "Error creating cards" });
  }
};

const cardUpdate = async () => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["front", "back"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const card = await Card.findOne({ _id, userId: req.user._id });
    if (!card) {
      return res.status(404).send({ error: "No deck found" });
    }
    updates.forEach((update) => {
      card[update] = req.body[update];
    });
    await card.save();
    res.send(card);
  } catch (e) {
    res.status(400).send({ error: "Error updating card" });
  }
};

const cardDelete = async () => {
  try {
    res.status(201).send();
  } catch (e) {
    res.status(400).send({ error: "Error deleting card" });
  }
};

module.exports = { cardCreate, cardCreateBatch, cardUpdate, cardDelete };
