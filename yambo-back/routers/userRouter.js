const express = require("express");
const router = express.Router();

const {
  loginUser,
  signupUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");

// user body = {email: '', password: ''}

/*
Password limitation:
Min 8 characters long
At least one lowercase letter
At least one uppercase letter
Min 1 symbol
Highly repeated characters are worth less points
*/

router.post("/signup", signupUser);

// email and password required
router.post("/login", loginUser);

router.get("/", requireAuth, getUser);

router.delete("/", requireAuth, deleteUser);

module.exports = router;
