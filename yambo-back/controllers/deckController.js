const Deck = require("../models/deckModel");
const Card = require("../models/cardModel");
const User = require("../models/userModel");

const deckCreate = async (req, res) => {
  try {
    const deck = await new Deck({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
    });
    await deck.save();
    if (!deck) {
      return res.status(409).send({ error: "Error making deck" });
    }
    const user = await User.findById(req.user._id);
    await user.decks.push(deck._id);
    await user.save();

    res.status(201).send(deck);
  } catch (e) {
    res.status(400).send({ error: "Error creating deck" });
  }
};

const deckGet = async (req, res) => {
  const _id = req.params.id;
  try {
    const deck = await Deck.findOne({ _id }).populate("cards");
    if (!deck) {
      return res.status(404).send({ error: "No deck found" });
    }
    res.send(deck);
  } catch (e) {
    res.status(400).send({ error: "Error retrieving deck" });
  }
};

const deckUpdate = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const deck = await Deck.findOne({ _id, userId: req.user._id });

    if (!deck) {
      return res.status(404).send({ error: "No deck found" });
    }

    updates.forEach((update) => {
      deck[update] = req.body[update];
    });
    await deck.save();
    res.send(deck);
  } catch (e) {
    res.status(400).send({ error: "Error updating deck" });
  }
};

const deckDelete = async (req, res) => {
  const _id = req.params.id;
  try {
    const deck = await Deck.findOne({ _id, user: req.user._id });
    if (!deck) {
      return res.status(404).send({ error: "No deck found" });
    }
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { decks: deck._id } }
    );
    await Card.deleteMany({ deck: _id });
    await Deck.deleteOne({ _id });
    res.status(200).send();
  } catch (e) {
    res.status(400).send({ error: "Error deleting deck" });
  }
};

module.exports = { deckCreate, deckGet, deckUpdate, deckDelete };
