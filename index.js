const express = require("express");
const route = require("./route/route.js");
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routes defined
app.use("/api", route);

app.listen(4000, () => {
  console.log(`Example app listening on port 4000!`);
});
