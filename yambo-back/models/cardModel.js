const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  front: {
    type: String,
    required: true,
    index: true,
  },
  back: {
    type: String,
    index: true,
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
