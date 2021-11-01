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
  const menus = await Menu.findAll({ where: { RestaurantId: req.params.id } });
  res.status(201).send(menus);
});

app.get("/api/menu/:menuId/item/:itemId", async (req, res) => {
  const item = await MenuItem.findOne({
    where: { id: req.params.itemId, MenuId: req.params.menuId },
  });

  res.status(201).send(item);
});

// Entry point
start()
  .then(() => console.log("Sequelize started"))
  .catch((err) => console.error(error));

app.listen(port, () => console.log(`Express listening on port ${port}`));
