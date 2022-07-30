const express = require("express");
const router = express.Router();

const { loginUser, signupUser } = require("../controllers/userController");

// user body = {email: '', password: ''}
router.post("/signup", signupUser);

// email and password required
router.post("/login", loginUser);

module.exports = router;
