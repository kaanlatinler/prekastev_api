const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const HomeAbout = sequelize.define(
  "HomeAbout",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Message is required" },
        notEmpty: { msg: "Message is required" },
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
    tableName: "home_about",
  }
);

module.exports = HomeAbout;
