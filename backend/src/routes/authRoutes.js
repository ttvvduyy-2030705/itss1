const express = require('express');
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const router = express.Router();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch user by email and compare passwords
const authenticateUser = async (email, password) => {
  try {
    // Fetch user by email
    let { data: user, error } = await supabase
      .from('users')
      .select('password')
      .eq('email', email)
      .single();

    if (error) {
      throw new Error('User not found');
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return false;
  }
};

// Route to handle user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const isAuthenticated = await authenticateUser(email, password);

  if (isAuthenticated) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { email, password, phone } = req.body;
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database
      const { data, error } = await supabase
        .from('users')
        .insert([
          { email, password: hashedPassword, phone }
        ])
        .select();
  
      if (error) {
        throw error;
      }
  
      res.status(201).json({ message: 'User registered successfully', user: data });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  });

module.exports = router;