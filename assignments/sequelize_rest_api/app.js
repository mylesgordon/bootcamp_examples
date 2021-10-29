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

// generic
async function createResource(resourceType, request, response) {
  try {
    const newResource = await resourceType.create(request.body);

    response.status(201).send(newResource);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

async function fetchAllResources(resourceType, response) {
  try {
    const resources = await resourceType.findAll({});
    response.status(201).send(resources);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

async function deleteResource(resourceType, request, response) {
  try {
    const resourceOnTheBlock = await resourceType.findOne({
      where: { id: request.body.id },
    });

    if (resourceOnTheBlock === null) {
      response.status(404).send("Resource was not found.");
    } else {
      resourceOnTheBlock.destroy();
      response
        .status(201)
        .send(`Resource with ID ${resourceOnTheBlock.id} deleted.`);
    }
  } catch (error) {
    response.status(400).send(error.message);
  }
}

// restauraunt
app.post(restaurauntPath, async (req, res) => {
  await createResource(Restaurant, req, res);
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

// Entry point
start()
  .then(() => console.log("Sequelize started"))
  .catch((err) => console.error(error));

app.listen(port, () => console.log(`Express listening on port ${port}`));
