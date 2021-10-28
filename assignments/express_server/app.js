const express = require("express");
const app = express();
const port = 3001;

let counter = 0;

app.get("/", (req, res) => {
  res.send(
    `Welcome to the route of the website. You are visitor number ${++counter}`
  );
});

app.get("/increase_by/:number", (req, res) => {
  if (req.params.number > 1_000_000) {
    res.send("You can not increase the counter by that many.");
  } else {
    counter += req.params.number;
    res.send(`Counter increased by ${req.params.number}`);
  }
});

app.get("/get_object", (req, res) => {
  if (counter === 0) {
    res.send({
      success: false,
      message: "The counter needs to be more than 0 to get a response",
    });
  } else {
    res.send({
      success: true,
      counter: counter,
    });
  }
});

app.listen(port, () => {
  console.log(`Starting server on port ${port}...`);
});
