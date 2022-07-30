const Deck = require("../models/deckModel");
const Card = require("../models/cardModel");
const User = require("../models/userModel");

const test = [
  {
    front: "Front card 1",
    back: "Back card 2",
  },
  {
    front: "Front card 2",
    back: "Back card 2",
  },
  {
    front: "Front card 3",
    back: "Back card 3",
  },
  {
    front: "Front card 4",
    back: "Back card 4",
  },
  {
    front: "Front card 5",
    back: "Back card 5",
  },
];

const batchCardCreate = async (cardArray, userId) => {
  let cardIdArray = [];
  for (let i = 0; i < cardArray.length; i++) {
    const newCard = await new Card({
      front: cardArray[i].front,
      back: cardArray[i].back,
      user: userId,
    });
    await newCard.save(req, res);
    cardIdArray.push(newCard._id);
  }
  return cardIdArray;
};
