const { Router } = require("express");
const fetch = require("node-fetch");

const Auth = require("../controllers/Auth");
const Music = require("../models/Music.js");

const router = Router();

router.get("/", async (req, res) => {
  const token = await Auth.generateToken();

  const query = {
    search: req.query.search !== undefined ? req.query.search : "song",
    type: req.query.type !== undefined ? req.query.type : "track",
    musicNumber:
      req.query.musicNumber !== undefined ? req.query.musicNumber : 10,
  };

  const searchData = await fetch(
    `https://api.spotify.com/v1/search?q=${query.search}&type=${query.type}&market=ES&locale=pt-BR&limit=${query.musicNumber}&offset=5`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => res.status(404).send(err));

  const filteredData = searchData.tracks.items.filter(
    (item) => item.preview_url !== null
  );

  const response = {};

  response.data = filteredData.map((item) => {
    return new Music(item);
  });

  res.status(200).send(response);
});

module.exports = router;
