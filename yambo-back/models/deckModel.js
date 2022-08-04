const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deckSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

module.exports = mongoose.model("Deck", deckSchema);
