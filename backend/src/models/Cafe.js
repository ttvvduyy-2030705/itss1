const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cafe = sequelize.define('Cafe', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  types: {
    type: DataTypes.JSON, // Nếu DB không hỗ trợ JSON, thay bằng DataTypes.STRING
    allowNull: true,
    defaultValue: [], // Đảm bảo luôn có giá trị mặc định
    get() {
      const types = this.getDataValue('types');
      return typeof types === 'string' ? JSON.parse(types) : types; // Tự động parse nếu là chuỗi
    },
    set(value) {
      this.setDataValue('types', Array.isArray(value) ? value : JSON.stringify(value)); // Luôn lưu dưới dạng JSON
    },
  },
}, {
  tableName: 'cafes',
  timestamps: false,
});

module.exports = Cafe;
