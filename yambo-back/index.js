require("dotenv").config({ path: __dirname + "/config/.env" });

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routers/userRouter");
const deckRoutes = require("./routers/deckRouter");
const cardRoutes = require("./routers/cardRouter");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  // console.log(req.path, req.method);
  next();
});

app.use("/user", userRoutes);
app.use("/deck", deckRoutes);
app.use("/card", cardRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongoose fully connnected.");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(
  process.env.PORT,
  console.log("Backend is listening on port", process.env.PORT)
);

module.exports = app;
