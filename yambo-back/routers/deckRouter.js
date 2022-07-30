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

router.post("/", deckCreate);

router.get("/:id", deckGet);

router.patch("/:id", deckUpdate);

router.delete("/:id", deckDelete);

module.exports = router;
