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

// Route to get all cafes or search by query
// Route để lấy danh sách tất cả các quán cafe (bao gồm categories)
router.get('/cafes', async (req, res) => {
  let { data: cafes, error } = await supabase
    .from('cafes')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(cafes);
});

// Route để thêm mới một quán cafe (bao gồm categories)
router.post('/cafes', async (req, res) => {
  const { name, phone, opening_hours, address, plus_code, categories } = req.body;

  let { data, error } = await supabase
    .from('cafes')
    .insert([
      { name, phone, opening_hours, address, plus_code, categories }
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Route to get cafe by ID
router.get('/cafes/:id', async (req, res) => {
  const { id } = req.params;
  const { data: cafe, error } = await supabase
    .from('cafes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(cafe);
});

// Route to insert a single cafe
router.post('/cafes', async (req, res) => {
  const { name, phone, opening_hours, address, plus_code, categories } = req.body;

  const { data, error } = await supabase
    .from('cafes')
    .insert([{ name, phone, opening_hours, address, plus_code, categories }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Route to insert multiple cafes
router.post('/cafes/multiple', async (req, res) => {
  const rows = req.body; // Expecting an array of objects
  const { data, error } = await supabase
    .from('cafes')
    .insert(rows)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = router;
