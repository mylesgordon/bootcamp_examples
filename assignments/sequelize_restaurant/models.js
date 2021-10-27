const { DataTypes } = require("sequelize");

const restaurantModel = {
  name: {
    type: DataTypes.TEXT,
  },
  imageLink: {
    type: DataTypes.TEXT,
  },
};

const menuModel = {
  title: {
    type: DataTypes.TEXT,
  },
};

const menuItemModel = {
  name: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
  },
};

module.exports = { restaurantModel, menuModel, menuItemModel };
