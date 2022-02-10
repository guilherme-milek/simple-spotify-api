const app = require("./app.js");

const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log(`App running on port: ${port}`);
});
