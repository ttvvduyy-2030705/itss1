const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Route to get all cafes
router.get('/cafes', async (req, res) => {
  let { data: cafes, error } = await supabase
    .from('cafes')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(cafes);
});

// Route to get cafe by ID
router.get('/cafes/:id', async (req, res) => {
  const { id } = req.params;
  let { data: cafe, error } = await supabase
    .from('cafes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(cafe);
})

// Route to insert a single row into cafes
router.post('/cafes', async (req, res) => {
    const { some_column, other_column } = req.body;
    let { data, error } = await supabase
      .from('cafes')
      .insert([
        { some_column, other_column }
      ])
      .select();
  
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  
    res.json(data);
  });
  
  // Route to insert multiple rows into cafes
  router.post('/cafes/multiple', async (req, res) => {
    const rows = req.body; // Expecting an array of objects
    let { data, error } = await supabase
      .from('cafes')
      .insert(rows)
      .select();
  
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  
    res.json(data);
  });

module.exports = router;