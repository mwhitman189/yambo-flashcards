const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  front: {
    type: String,
    required: true,
    index: true,
  },
  back: {
    type: string,
    index: true,
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
