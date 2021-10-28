const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001;

let counter = 0;

app.get("/", (req, res) => {
  res.send(
    `Welcome to the route of the website. You are visitor number ${++counter}.
    To submit a counter number, type in below:
    <form name="counterform" method="POST" action="/submit_counter">
        <input type="text" name="counterText"/>
        <input type="submit" value="Submit">
    </form>`
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

app.post("/submit_counter", (req, res) => {
  const counterText = req.body.counterText;
  if (
    counterText === undefined ||
    counterText.length === 0 ||
    isNaN(counterText)
  ) {
    res.send("Counter request was unsuccessful");
  } else {
    counter = counterText;
    res.send("Counter has been updated.");
  }
});

app.listen(port, () => {
  console.log(`Starting server on port ${port}...`);
});
