const express = require("express");
const fetch = require("node-fetch");
const Router = express.Router();
const url = "http://localhost:3002/api/restaurant";

Router.get("/", async (req, res, next) => {
  try {
    const response = await fetch(url);
    const restaurants = await response.json();
    res.render("restaurants", { restaurants });
  } catch (error) {
    return next(error);
  }
});

module.exports = Router;
