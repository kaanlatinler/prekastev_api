const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Portfoilo = sequelize.define(
  "Portfoilo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    groundFloorGrossArea: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    groundFloorTerrace: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    groundFloorPool: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    firstFloorGrossArea: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    firstFloorTerrace: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    roomCount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mainPicture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "portfoilos",
  }
);

// Import the Image model after defining Portfoilo
const Image = require("./Images"); // Ensure the path is correct

// Set up associations
Portfoilo.hasMany(Image, { foreignKey: "pId", sourceKey: "id" });
Image.belongsTo(Portfoilo, { foreignKey: "pId", targetKey: "id" });

module.exports = Portfoilo;
