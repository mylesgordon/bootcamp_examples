// Set up
const express = require("express"),
  { sequelize } = require("./connection"),
  { MenuItemResource } = require("./routes/menuItem"),
  { MenuResource } = require("./routes/menu"),
  { RestaurauntResource } = require("./routes/restaurant");

const app = express(),
  port = 3002,
  restaurauntPath = "/api/restaurant",
  menuItemPath = "/api/item",
  menuPath = "/api/menu";

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Functions/routing
async function start() {
  await sequelize.sync({
    logging: false,
  });
}

// restauraunt
app.post(restaurauntPath, RestaurauntResource.post);
app.get(restaurauntPath, RestaurauntResource.getAll);
app.get(restaurauntPath + "/:id", RestaurauntResource.getByID);
app.delete(restaurauntPath, RestaurauntResource.delete);
app.put(restaurauntPath, RestaurauntResource.put);

// Menu
app.post(menuPath, MenuResource.post);
app.get(menuPath, MenuResource.getAll);
app.get(menuPath + "/:id", MenuResource.getByID);
app.delete(menuPath, MenuResource.delete);
app.put(menuPath, MenuResource.put);

// Menu item
app.post(menuItemPath, MenuItemResource.post);
app.get(menuItemPath, MenuItemResource.getAll);
app.get(menuItemPath + "/:id", MenuItemResource.getByID);
app.delete(menuItemPath, MenuItemResource.delete);
app.put(menuItemPath, MenuItemResource.put);

// Extra routes (generic class approach didn't work well for this)
const { Menu, MenuItem } = require("./connection");

app.get("/api/restaurant/:id/menu", async (req, res) => {
  try {
    const menus = await Menu.findAll({
      where: { RestaurantId: req.params.id },
    });
    res.status(201).send(menus);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/menu/:menuId/item/:itemId", async (req, res) => {
  try {
    const item = await MenuItem.findOne({
      where: { id: req.params.itemId, MenuId: req.params.menuId },
    });
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/menu/:menuId/items", async (req, res) => {
  try {
    const items = await MenuItem.findAll({
      where: { MenuId: req.params.menuId },
    });
    res.status(201).send(items);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Entry point
start()
  .then(() => console.log("Sequelize started"))
  .catch((err) => console.error(error));

app.listen(port, () => console.log(`Express listening on port ${port}`));
