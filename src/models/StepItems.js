const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const StepItems = sequelize.define(
  "StepItems",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    item: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "item is required" },
        notEmpty: { msg: "item is required" },
      },
    },
    StepId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "StepId is required" },
        notEmpty: { msg: "StepId is required" },
      },
    },
  },
  {
    timestamps: true,
    tableName: "step_items",
  }
);

module.exports = StepItems;
