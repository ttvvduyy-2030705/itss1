const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your-database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

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
  categories: { 
    type: DataTypes.JSON, 
    allowNull: true,
    defaultValue: [],
    get() {
      const categories = this.getDataValue('categories');
      return Array.isArray(categories) ? categories : JSON.parse(categories); 
    },
    set(value) {
      this.setDataValue('categories', Array.isArray(value) ? value : JSON.stringify(value)); 
    },
  },
}, {
  tableName: 'cafes',
  timestamps: false,
});

// API endpoint to get cafes
app.get('/api/cafes', async (req, res) => {
  try {
    const cafes = await Cafe.findAll();
    // Format the response to ensure categories are returned as arrays
    res.json(cafes.map(cafe => ({
      id: cafe.id,
      name: cafe.name,
      description: cafe.description,
      rating: cafe.rating,
      distance: cafe.distance,
      image: cafe.image,
      categories: cafe.categories, // Ensure this is returned as an array of categories
    })));
  } catch (error) {
    console.error('Failed to fetch cafes:', error);
    res.status(500).json({ message: 'Failed to fetch cafes' });
  }
});

module.exports = Cafe;
