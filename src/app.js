const express = require("express");
const searchRouter = require("./routes/spotify.js");
const authRouter = require("./routes/auth.js");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", searchRouter);
app.use("/auth", authRouter);

module.exports = app;
