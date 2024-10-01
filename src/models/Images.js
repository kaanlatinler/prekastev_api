const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Image = sequelize.define(
  "Images",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "images",
  }
);

// Export the Image model first
module.exports = Image;
