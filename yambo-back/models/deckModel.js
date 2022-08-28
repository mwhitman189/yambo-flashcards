const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deckSchema = new Schema({
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Deck", deckSchema);
