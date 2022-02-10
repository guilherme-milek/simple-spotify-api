const express = require("express");
const router = require("./routes/spotify.js");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/tracks", router);

module.exports = app;
