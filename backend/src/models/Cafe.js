const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cafe = sequelize.define('Cafe', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone: {
    type: DataTypes.TEXT
  },
  opening_hours: {
    type: DataTypes.TEXT
  },
  latitude: {
    type: DataTypes.NUMERIC
  },
  longitude: {
    type: DataTypes.NUMERIC
  },
  address: {
    type: DataTypes.TEXT
  },
  plus_code: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'cafes',
  timestamps: false
});

module.exports = Cafe;