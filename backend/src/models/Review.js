const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  cafe_id: {
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  rating: {
    type: DataTypes.INTEGER
  },
  comment: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reviews',
  timestamps: false
});

module.exports = Review;