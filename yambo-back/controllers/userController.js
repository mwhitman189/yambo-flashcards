const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).send({ email, token });
  } catch (e) {
    res.status(400).send({ error: "Error logging in user" });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).send({ email, token });
  } catch (e) {
    res.status(400).send({ error: "Error creating user" });
  }
};

const getUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id).populate("decks");
    if (!user) {
      return res.status(404).send({ error: "No user found" });
    }
    res.send(user);
  } catch (e) {
    res.status(404).send({ error: "Error finding user" });
  }
};

module.exports = { signupUser, loginUser, getUser };
