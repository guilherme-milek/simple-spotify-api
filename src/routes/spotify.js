const { Router } = require("express");
const fetch = require("node-fetch");

const router = Router();

const accessToken =
  "BQAfMoCx_4etlwGA22vg3nreaORuDcUbokbm6F_NHfOqyhK0MEeKXpTQrb-qBfJAZ1JgOObXOTZexz8yIlpctibW8vDrysM1lnb-lnHUWZ9jzlkMuHzPA9cmF91CFyFchHxhAKzVNyikfyGkchFmdorK0gX1XMgDu2MilT17LtHvqJCfeO8aULy1vXd3P4cFyk55N_PWCa4rzqbkA1M8zAvRJ0srSgRp9Znxil27iKo";

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

  const response = {
    data: filteredData.map((item) => {
      return {
        id: item.id,
        name: item.name,
        explicit: item.explicit,
        duration_ms: item.duration_ms,
        music_url: item.preview_url,
        spotify_url: item.external_urls.spotify,
        release_date: item.release_date,
        artists: item.artists.map((artist, index) => {
          return {
            id: artist.id,
            name: artist.name,
            spotify_url: artist.external_urls.spotify,
          };
        }),
      };
    }),
  };

  res.status(200).send(response);
});

module.exports = router;
