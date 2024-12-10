const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorite = sequelize.define('Favorite', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  cafe_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'favorites',
  timestamps: false
});

module.exports = Favorite;