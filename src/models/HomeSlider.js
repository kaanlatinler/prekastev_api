const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const HomeSlider = sequelize.define(
  "HomeSlider",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title is required" },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Image is required" },
        notEmpty: { msg: "Image is required" },
      },
    },
  },
  {
    timestamps: true,
    tableName: "home_sliders",
  }
);

module.exports = HomeSlider;
