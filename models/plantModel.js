const { DataTypes } = require('sequelize');

const db = require('../config'); //Conexion a la DB

const Plant = db.define(
  'Plant',
  {
    plantId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },

    middleAlerts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    highAlerts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sensorsDisabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'plants',
    timestamps: false,
  }
);

module.exports = Plant;
