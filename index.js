const express = require("express");
const route = require("./route/route.js");
const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'uploads' directory (optional, for testing)
app.use("/uploads", express.static("uploads"));

// Use the routes defined
app.use("/api", route);

app.listen(4000, () => {
  console.log(`Example app listening on port 4000!`);
});
