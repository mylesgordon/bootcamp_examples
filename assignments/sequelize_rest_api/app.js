// Set up
const express = require("express"),
  { sequelize } = require("./connection"),
  { MenuResource } = require("./routes/menu"),
  { RestaurauntResource } = require("./routes/restaurant");

const app = express(),
  port = 3002,
  restaurauntPath = "/api/restaurant",
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

// Entry point
start()
  .then(() => console.log("Sequelize started"))
  .catch((err) => console.error(error));

app.listen(port, () => console.log(`Express listening on port ${port}`));
