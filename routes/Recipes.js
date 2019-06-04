const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/recipes", async (req, res) => {
  try {
    const recetas = await pool.query("SELECT * FROM recipe");
    res.json(recetas);
  } catch (e) {
    console.log(e);
  }
});

router.get("/ingredients", async (req, res) => {
  try {
    const ingredientes = await pool.query("SELECT * FROM ingredient");
    res.json(ingredientes);
  } catch (e) {
    console.log(e);
  }
});

router.get("/view-recipe/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await pool.query("SELECT * FROM recipe WHERE id = ?", [id]);
    req.flash("success", "Fino");
    res.json(recipe);
  } catch (e) {
    req.flash("success", "No se");
  }
});

router.post("/search-recipes", async (req, res) => {
  var { filters, name } = req.body;
  console.log(filters);
  name = name.concat("%");
  console.log(name);
  try {
    const reci = await pool.query("SELECT * FROM recipe WHERE name LIKE ? ", [
      name
    ]);
    console.log(reci);
    res.json(reci);
  } catch (e) {
    console.log("failure");
  }
});

router.post("/add-recipe", async (req, res) => {
  const {
    name,
    instructions,
    prep_time,
    servings,
    calories_ps,
    thumbnail
  } = req.body;

  const newRecipe = {
    name,
    instructions,
    prep_time,
    servings,
    calories_ps,
    thumbnail
  };
  try {
    await pool.query("INSERT INTO recipe set ?", [newRecipe]);
  } catch (e) {}
});

router.post("/add-ingredient", async (req, res) => {
  const { name } = req.body;

  const newIngr = {
    name
  };
  try {
    await pool.query("INSERT INTO ingredient set ?", [newIngr]);
  } catch (e) {}
});

module.exports = router;
