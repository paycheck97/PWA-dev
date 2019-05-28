const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get("/recipes", async (req, res) => {
    console.log("por aqui pase");
    try {
      const recetas = await pool.query('SELECT * FROM recipe');
    res.json(recetas);
    } catch (e) {
      console.log(e);
    }
  });
  
  module.exports = router;
  
