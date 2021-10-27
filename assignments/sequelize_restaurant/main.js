const { sequelize, Restaurant, Menu, MenuItem } = require("./connection");
const { restaurantModel } = require("./models");

async function syncDb() {
  await sequelize.sync({
    force: true,
  });
}

async function createRows() {
  await syncDb();

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

  return [restaurant, menu, item];
}

async function displayObject(objectType, name) {
  const object = await objectType.findAll({});
  console.log(`All entries of ${name}: ${JSON.stringify(object)}`);
}

async function main() {
  const [restaurant, menu, item] = await createRows();

  restaurant.update({ name: "Restaurant name" });
  await displayObject(Restaurant, "Restaurant");
  await displayObject(Menu, "Menu");
  await displayObject(MenuItem, "MenuItem");

  const menus = await restaurant.getMenus();
  console.log(`${restaurant.name} has the menu '${menus[0].title}''`);

  const newItem = await MenuItem.create({
    name: "New Falafel",
    price: 55.0,
  });

  item.destroy();
  menu.addMenuItem(newItem);

  await displayObject(MenuItem, "MenuItem");
}

main();
