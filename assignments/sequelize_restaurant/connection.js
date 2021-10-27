const { Sequelize } = require("sequelize");
const { restaurantModel, menuModel, menuItemModel } = require("./models");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data.db",
});

const Restaurant = sequelize.define("Restaurant", restaurantModel);
const Menu = sequelize.define("Menu", menuModel);
const MenuItem = sequelize.define("MenuItem", menuItemModel);

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);
Menu.hasMany(MenuItem);
MenuItem.belongsTo(Menu);

module.exports = { sequelize, Restaurant, Menu, MenuItem };
