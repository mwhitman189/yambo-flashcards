const express = require("express");
const router = express.Router();

const { loginUser, signupUser } = require("../controllers/userController");

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

module.exports = router;
