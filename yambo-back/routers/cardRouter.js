const express = require("express");

const requireAuth = require("../middleware/requireAuth");

const {
  cardCreate,
  cardGet,
  cardUpdate,
  cardDelete,
} = require("../controllers/cardController");

const router = express.Router();

router.use(requireAuth);

router.post("/", cardCreate);

router.get("/:id", cardGet);

router.patch("/:id", cardUpdate);

router.delete("/:id", cardDelete);

module.exports = router;
