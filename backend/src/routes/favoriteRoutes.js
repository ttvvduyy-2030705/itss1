const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const router = express.Router();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Route to create a new favorite
router.post('/favorites', async (req, res) => {
  const { user_id, cafe_id } = req.body;

  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert([
        { user_id, cafe_id }
      ])
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({ message: 'Favorite added successfully', favorite: data });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Error adding favorite', error: error.message });
  }
});

// Route to get all favorite cafes for a user by user ID
router.get('/favorites/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('cafe_id')
      .eq('user_id', user_id);

    if (error) {
      throw error;
    }

    res.status(200).json({ favorites: data });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
});

module.exports = router;