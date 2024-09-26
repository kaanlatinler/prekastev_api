const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Services = sequelize.define(
  "Services",
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Description is required" },
        notEmpty: { msg: "Description is required" },
      },
    },
  },
  {
    timestamps: true,
    tableName: "services",
  }
);

module.exports = Services;
