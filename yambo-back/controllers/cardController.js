const Deck = require("../models/deckModel");
const Card = require("../models/cardModel");

const batchCardCreate = async (cardArray, deckId, userId) => {
  let cardIdArray = [];
  for (let i = 0; i < cardArray.length; i++) {
    const newCard = await new Card({
      front: cardArray[i].front,
      back: cardArray[i].back,
      user: userId,
      deck: deckId,
    });
    await newCard.save();
    cardIdArray.push(newCard._id);
  }
  return cardIdArray;
};

const cardCreate = async (req, res) => {
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

    const deck = await Deck.findOne({ _id: deckId }).populate("cards");
    await deck.cards.push(newCard);
    await deck.save();

    res.status(201).send(deck);
  } catch (e) {
    res.status(400).send({ error: "Error creating card" });
  }
};

const cardCreateBatch = async (req, res) => {
  const { deckId, cards } = req.body;
  const userId = req.user._id;
  try {
    const newCards = await batchCardCreate(cards, deckId, userId);
    if (!newCards) {
      return res.status(409).send({ error: "Error making cards" });
    }
    await Deck.findOneAndUpdate(
      { _id: deckId },
      { $push: { cards: newCards } }
    );
    const foundDeck = await Deck.findById(deckId).populate("cards");

    res.status(201).send(foundDeck);
  } catch (e) {
    res.status(400).send({ error: "Error creating cards" });
  }
};

const cardUpdate = async (req, res) => {
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

const cardDelete = async (req, res) => {
  const _id = req.params.id;
  try {
    const card = await Card.findOneAndDelete({ _id, user: req.user._id });
    if (!card) {
      return res.status(404).send({ error: "Could not find card" });
    }
    await Deck.findOneAndUpdate({ _id: card.deck }, { $pull: { cards: _id } });
    await Card.deleteOne({ _id });
    res.status(200).send();
  } catch (e) {
    res.status(400).send({ error: "Error deleting card" });
  }
};

module.exports = { cardCreate, cardCreateBatch, cardUpdate, cardDelete };
