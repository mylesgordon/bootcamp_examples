const { DataTypes } = require("sequelize");

const restaurantModel = {
  name: {
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true,
    },
  },
  imageLink: {
    type: DataTypes.TEXT,
    validate: {
      isUrl: true,
    },
  },
};

const menuModel = {
  title: {
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true,
    },
  },
};

const menuItemModel = {
  name: {
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.FLOAT,
  },
};

module.exports = { restaurantModel, menuModel, menuItemModel };
