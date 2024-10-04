const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const HomeSteps = sequelize.define(
  "HomeSteps",
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
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Message is required" },
        notEmpty: { msg: "Message is required" },
      },
    },
  },
  {
    timestamps: true,
    tableName: "home_steps",
  }
);

const Step = require("./StepItems");

HomeSteps.hasMany(Step, { foreignKey: "StepId", sourceKey: "id" });
Step.belongsTo(HomeSteps, { foreignKey: "StepId", targetKey: "id" });

module.exports = HomeSteps;
