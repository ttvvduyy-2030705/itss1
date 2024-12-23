const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const cafeRoutes = require('./routes/cafeRoutes'); 
const authRoutes = require('./routes/authRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');


// Load biến môi trường từ file .env
dotenv.config();

const app = express();

// Middleware cơ bản
app.use(express.json());
app.use(cors());

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use('/api', cafeRoutes);
app.use('/auth', authRoutes);
app.use('/api', favoriteRoutes);

// Lắng nghe server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
