const { DataTypes } = require("sequelize");

const restaurantModel = {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  imageLink: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true,
      notNull: true,
    },
  },
};

const menuModel = {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
};

const menuItemModel = {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
    },
  },
};

module.exports = { restaurantModel, menuModel, menuItemModel };
