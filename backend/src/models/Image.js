const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  cafe_id: {
    type: DataTypes.INTEGER
  },
  cafe_url: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'images',
  timestamps: false
});

module.exports = Image;