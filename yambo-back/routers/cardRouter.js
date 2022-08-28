const express = require("express");

const requireAuth = require("../middleware/requireAuth");

const {
  cardCreate,
  cardCreateBatch,
  cardUpdate,
  cardDelete,
} = require("../controllers/cardController");

const router = express.Router();

router.use(requireAuth);

/*
Request data model for single card create:
{
  deckId: 1jlk12j3l1239asdj,
  card: {front: '', back: ''},
}
*/
router.post("/", cardCreate);

/* 
Request data model for batch card create:
{
  deckId: 1jlk12j3l1239asdj,
  cards: [{front: '', back: ''}, {front: '', back: ''}],
}
*/

router.post("/batch", cardCreateBatch);

// updates a specific card from offered Id
// body should have updates: {front: '', back: ''}
router.patch("/:id", cardUpdate);

// deletes a specific card from offered Id
router.delete("/:id", cardDelete);

module.exports = router;
