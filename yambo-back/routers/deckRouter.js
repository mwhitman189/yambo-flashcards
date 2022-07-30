const express = require("express");

const requireAuth = require("../middleware/requireAuth");
const {
  deckCreate,
  deckGet,
  deckUpdate,
  deckDelete,
} = require("../controllers/deckController");

const router = express.Router();

router.use(requireAuth);

// Creates a deck
// Requires auth, and req.body with deck {title: '', description: ''}
router.post("/", deckCreate);

// Retrieves a single deck with all cards within
router.get("/:id", deckGet);

// Updates the deck for title and description attributes
router.patch("/:id", deckUpdate);

// Deletes chosen deck and all associated cards
router.delete("/:id", deckDelete);

module.exports = router;
