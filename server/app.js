// imports
const express = require("express");
const app = express();

// add viewer engine

// add passport session

// send static files from public
app.use(express.static("public"));

// routes
app.get("/api", (req, res) => {
  // res.json({ message: "Hello from server!" });
  res.send('<img src="/waldo_beach.jpg" />');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app listening on ${PORT}!`);
});
