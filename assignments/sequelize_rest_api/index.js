// Set up
const express = require("express");
const { sequelize, Restaurant, Menu, MenuItem } = require("./connection");

const app = express();
const port = 3002;
app.use(express.json());

const restaurauntPath = "/api/restaurant";

// Functions/routing
async function start() {
  await sequelize.sync({
    logging: false,
  });
}

app.post(restaurauntPath, async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);

    res.status(201).send(newRestaurant);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get(restaurauntPath, async (req, res) => {
  try {
    const restauraunts = await Restaurant.findAll({});

    res.status(201).send(restauraunts);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete(restaurauntPath, async (req, res) => {
  try {
    const restaurauntOnTheBlock = await Restaurant.findOne({
      where: { id: req.body.id },
    });

    if (restaurauntOnTheBlock === null) {
      res.status(404).send("Restaurant was not found.");
    } else {
      restaurauntOnTheBlock.destroy();
      res.status(201).send(`Restaurant ${restaurauntOnTheBlock.name} deleted.`);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.put(restaurauntPath, async (req, res) => {
  try {
    const restaurantToBeUpdated = await Restaurant.findOne({
      where: { id: req.body.id },
    });

    if (restaurantToBeUpdated === null) {
      res.status(404).send("Restaurant was not found.");
    } else {
      if (req.body.name) {
        restaurantToBeUpdated.name = req.body.name;
      }

      if (req.body.imageLink) {
        restaurantToBeUpdated.imageLink = req.body.imageLink;
      }

      restaurantToBeUpdated.save();
      res.status(201).send(`Restaurant ${restaurantToBeUpdated.name} updated.`);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Entry point
start()
  .then(() => console.log("Sequelize started"))
  .catch((err) => console.error(error));

app.listen(port, () => console.log(`Express listening on port ${port}`));
