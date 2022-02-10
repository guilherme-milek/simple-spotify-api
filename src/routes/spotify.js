const { Router } = require("express");
const fetch = require("node-fetch");

const Music = require("../models/Music.js");

const router = Router();

const accessToken =
  "BQCqKAsfDqq_Z2WHC2Xyn4rnbJz5BF6Eg5Kqf0zJ_VQDCIC1_GxRqhbO2bVtrjABHdZa4UOEL0VdWA56DBrItzI0VtfYSejoBSBjAPiJ6Iooua-Pz9iMl4BRbXKPRfO0Ly2mhq9V3t0ElC-8BSEpV2zkXSKDcaWmPDvAoTTFpkdFmN17f7n9oZ2N5nEFz-TCuy7HE-ZMxXcwjl3I8JeJ6v9h5fBYLVKXyJnirFNeMH8";

router.get("/", async (req, res) => {
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
        Authorization: `Bearer ${accessToken}`,
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
