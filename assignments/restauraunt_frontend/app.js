const express = require("express");
const handlebars = require("./handlebars");
const { indexRoute, restaurantRoute } = require("./routes");

const app = express();

app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

// allow both URL encoded and JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// routes
app.use("/", indexRoute);
app.use("/restaurants", restaurantRoute);

app.listen(80, () => {
  console.log("Frontend running on port 80");
});
