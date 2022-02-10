const { Router } = require("express");

const Auth = require("../controllers/Auth.js");

const router = Router();

router.get("/", async (req, res) => {
  const token = await Auth.generateToken();

  res.status(200).send(token);
});

module.exports = router;
