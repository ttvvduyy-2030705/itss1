const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const app = express();

const sequelize = new Sequelize('your-database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Định nghĩa model Cafe với cột url_image
const Cafe = sequelize.define(
  'Cafe',
  {
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
    url_image: {
      type: DataTypes.STRING,
      allowNull: true, // Cho phép giá trị null nếu không có ảnh
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const categories = this.getDataValue('categories');
        return Array.isArray(categories) ? categories : JSON.parse(categories);
      },
      set(value) {
        this.setDataValue(
          'categories',
          Array.isArray(value) ? value : JSON.stringify(value)
        );
      },
    },
  },
  {
    tableName: 'cafes',
    timestamps: false,
  }
);

// API endpoint để lấy danh sách các quán cafe
app.get('/api/cafes', async (req, res) => {
  try {
    const cafes = await Cafe.findAll();
    // Format lại response để đảm bảo categories và url_image trả về đúng
    res.json(
      cafes.map((cafe) => ({
        id: cafe.id,
        name: cafe.name,
        description: cafe.description,
        rating: cafe.rating,
        distance: cafe.distance,
        image: cafe.image,
        url_image: cafe.url_image, // Thêm url_image vào response
        categories: cafe.categories, // Đảm bảo trả về mảng
      }))
    );
  } catch (error) {
    console.error('Failed to fetch cafes:', error);
    res.status(500).json({ message: 'Failed to fetch cafes' });
  }
});

// Xuất model để sử dụng ở nơi khác nếu cần
module.exports = Cafe;

// Khởi động server (chỉ thêm nếu bạn chưa làm)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
