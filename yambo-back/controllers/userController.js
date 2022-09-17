const User = require("../models/userModel");
const Card = require("../models/cardModel");
const Deck = require("../models/deckModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);

    res.status(201).send({ user: user.scrub(), token });
  } catch (e) {
    res.status(400).send({ error: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).send({ user: user.scrub(), token });

  } catch (e) {
    res.status(400).send({ error: "Error logging in user" });
  }
};

const getUser = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId);
    res.send(user.scrub());
  } catch (e) {
    res.status(404).send({ error: "Error finding user" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ error: "No user found" });
    }
    await Card.deleteMany({ user: userId });
    await Deck.deleteMany({ user: userId });
    await User.deleteOne({ _id: userId });
    res.send(user.scrub());
  } catch (e) {
    res.status(500).send({ error: "Error deleting user" });
  }
};

module.exports = { signupUser, loginUser, getUser, deleteUser };
