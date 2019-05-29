const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get("/recipes", async (req, res) => {
    try {
        const recetas = await pool.query('SELECT * FROM recipe');
        res.json(recetas);
    } catch (e) {
      console.log(e);
    }
  });

  router.get("/ingredients", async (req, res) => {
    try {
        const ingredientes = await pool.query('SELECT * FROM ingredient');
        res.json(ingredientes);
    } catch (e) {
      console.log(e);
    }
  });

  router.get('/view-recipe/:id', async(req, res) =>{
    const {id} = req.params;
    try{
        const recipe = await pool.query('SELECT * FROM recipe WHERE id = ?', [id]);
        req.flash('success','Fino');
        res.json(recipe)
    }catch(e)
    {
        req.flash('success','No se');
    }
});
  
  module.exports = router;
  
