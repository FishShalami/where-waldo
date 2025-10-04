// imports
const express = require("express");
const app = express();
const path = require("path");

// add viewer engine

// add passport session

// send static files from public
app.use(express.static("public"));

// routes
app.get("/api", (req, res) => {
  // res.json({ message: "Hello from server!" });
  res.sendFile(path.resolve("public/waldo_beach.jpg"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app listening on ${PORT}!`);
});
