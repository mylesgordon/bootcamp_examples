// Set up
const express = require("express");
const {
  createResource,
  fetchAllResources,
  deleteResource,
} = require("./generic");
const { sequelize, Restaurant, Menu, MenuItem } = require("./connection");

const app = express();
const port = 3002;
app.use(express.json());

const restaurauntPath = "/api/restaurant";
const menuPath = "/api/menu";

// Functions/routing
async function start() {
  await sequelize.sync({
    logging: false,
  });
}

// restauraunt
app.post(restaurauntPath, async (req, res) => {
  await createResource(Restaurant, req, res, true);
});

app.get(restaurauntPath, async (req, res) => {
  await fetchAllResources(Restaurant, res);
});

app.delete(restaurauntPath, async (req, res) => {
  await deleteResource(Restaurant, req, res);
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

// Menu
app.post(menuPath, async (req, res) => {
  try {
    if (!req.body.restaurauntID) {
      throw new Error("Restauraunt ID field required");
    }

    const restaurauntId = req.body.restaurauntID;
    delete req.body.restaurauntID;

    const menu = await createResource(Menu, req, res, false);
    const restauraunt = await Restaurant.findOne({
      where: { id: restaurauntId },
    });

    restauraunt.addMenu(menu);
    res.status(200).send(`Menu ${req.body.title} created`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get(menuPath, async (req, res) => {
  await fetchAllResources(Menu, res);
});

app.delete(menuPath, async (req, res) => {
  await deleteResource(Menu, req, res);
});

// Entry point
start()
  .then(() => console.log("Sequelize started"))
  .catch((err) => console.error(error));

app.listen(port, () => console.log(`Express listening on port ${port}`));
