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

router.post("/saved-recipes", async (req, res) => {
  const { id_user } = req.body;
  var saved_recipes = [];
  var id_receta_salvada = null;
  var aux_recetas = null;
  console.log(id_user);
  try {
    const id_recetas = await pool.query(
      "SELECT id_recipe FROM saves WHERE id_user = ?",
      [id_user]
    );
    console.log(id_recetas);
    id_recetas.map(async id_receta => {
      id_receta_salvada = id_receta["id_recipe"];
      console.log(id_receta_salvada)
      aux_recetas = await pool.query("SELECT * FROM recipe WHERE id = ?", [
        id_receta_salvada
      ]);
      saved_recipes.push(aux_recetas[0]);
    },
      console.log(saved_recipes)
    );
    res.json(saved_recipes)
    
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
    res.json(e);
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

//Buscar por ingrediente
router.post("/search-recipes-i", async (req, res) => {
  var { filters } = req.body;
  var whole = [];
  var check = true;
  var firstTime = true;
  var in_recetas = [];

  try {
    const ser = filters.map(async filter => {
      const ingre = await pool.query(
        "SELECT id FROM ingredient WHERE name = ?",
        [filter]
      );
      const id = ingre[0]["id"];
      console.log("se imprime el id: ", id);
      const id_recipes = await pool.query(
        "SELECT id_recipe FROM search WHERE id_ingredient = ?",
        [id]
      );
      if (whole.length < 1 && firstTime == true) {
        whole = id_recipes;
      }

      for (i = whole.length - 1; i >= 0; i--) {
        check = false;
        id_recipes.map(id_recipe => {
          if (whole[i]["id_recipe"] == id_recipe["id_recipe"]) {
            check = true;
          }
        });
        if (check == false) {
          whole.splice(i, 1);
        }
      }
      if (whole.length < 1) {
        firstTime = false;
      }
    });

    Promise.all(ser).then(async () => {
      for (i = whole.length - 1; i >= 0; i--) {
        try {
          const aux = await pool.query("SELECT * FROM recipe WHERE id = ?", [
            whole[i]["id_recipe"]
          ]);
          in_recetas.push(aux[0]);
        } catch (e) {
          console.log(e);
        }
      }
      console.log(in_recetas);
      res.json(in_recetas);
    });
  } catch (e) {
    console.log(e);
  }
});

//buscar por nombre
router.post("/search-recipes", async (req, res) => {
  var { name } = req.body;
  name = name.concat("%");
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
//Agregar Receta
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

router.post("/update-recipe/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    instructions,
    prep_time,
    servings,
    calories_ps,
    thumbnail
  } = req.body;

  const updateRecipe = {
    name,
    instructions,
    prep_time,
    servings,
    calories_ps,
    thumbnail
  };
  try {
    await pool.query("UPDATE recipe set ? WHERE id = ?", [updateRecipe, id]);
  } catch (e) {
    console.log(e);
  }
});

router.post("/change-rating/:id", async (req, res) => {
  const { rating } = req.body;
  const { id } = req.params;
  console.log(id);
  try {
    await pool.query("UPDATE recipe SET rating = ? WHERE id = ?", [rating, id]);
  } catch (e) {
    console.log(e);
  }
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
