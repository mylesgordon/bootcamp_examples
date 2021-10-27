const { sequelize, Restaurant, Menu, MenuItem } = require("./connection");

async function syncDb() {
  await sequelize.sync({
    force: true,
  });
}

async function createRows() {
  const restaurant = await Restaurant.create({
    name: "Testaurant",
    imageLink: "https://link-of-some-variety.com",
  });

  const menu = await Menu.create({
    title: "Vegan menu",
  });

  const item = await MenuItem.create({
    name: "Falafel",
    price: 5.99,
  });

  await restaurant.addMenu(menu);
  await menu.addMenuItem(item);
}

async function main() {
  await syncDb();
  await createRows();
}

main();
