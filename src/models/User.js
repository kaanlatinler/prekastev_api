const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" }, // Null kontrolü için
        notEmpty: { msg: "Name is required" }, // Boş kontrolü için
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" }, // Null kontrolü için
        notEmpty: { msg: "Name is required" }, // Boş kontrolü için
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Email benzersiz olmalı
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Must be a valid email" }, // Email formatı kontrolü
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password is required" },
      },
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını ekler
    tableName: "users", // tablo adını manuel belirleme
  }
);

module.exports = User;
