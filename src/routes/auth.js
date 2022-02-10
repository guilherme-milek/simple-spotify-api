const { Router } = require("express");
const fetch = require("node-fetch");

const router = Router();

router.get("/", async (req, res) => {
  const client_id = "67bec0d98e7740f5adfee46fbaea3d79";
  const client_secret = "b0a156a176c644e2938b36895e2aa07d";

  let token = "";

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${client_id}:${client_secret}`,
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  })
    .then((response) => (token = response))
    .catch((err) => console.log(err));
  console.log(token);
  res.status(200).send(token);
});

module.exports = router;
