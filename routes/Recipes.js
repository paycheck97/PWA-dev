const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/recipes", async (req, res) => {
  try {
    const recetas = await pool.query(
      "SELECT *, avg(ratings.rate) AS avg from recipe INNER JOIN ratings ON recipe.id = ratings.id_recipe GROUP BY id_recipe ORDER BY rate DESC LIMIT 5"
    );
    res.json(recetas);
  } catch (e) {
    console.log(e);
  }
});

router.post("/saved-recipes", async (req, res) => {
  const { id_user } = req.body;
  console.log(id_user);
  try {
    const id_recetas = await pool.query(
      "SELECT * FROM saves INNER JOIN recipe ON saves.id_recipe = recipe.id WHERE id_user = ?",
      [id_user]
    );
      res.json(id_recetas);
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

router.get("/look-ingre/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ingred = await pool.query("SELECT id_recipe, ingredient.name FROM search INNER JOIN ingredient ON search.id_ingredient = ingredient.id WHERE id_recipe = ?", [id]);
    console.log(ingred);
    res.json(ingred);
  } catch (e) {
    console.log(e);
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
          const aux = await pool.query("SELECT *, AVG(rate) as avg FROM recipe INNER JOIN ratings ON recipe.id = ratings.id_recipe WHERE id = ?", [
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
    const reci = await pool.query("SELECT *, AVG(rate) as avg FROM recipe INNER JOIN ratings ON recipe.id = ratings.id_recipe WHERE name LIKE ? ", [
      name
    ]);
    console.log(reci);
    res.json(reci);
  } catch (e) {
    console.log("failure");
  }
});

//buscar por valoracion
router.post("/search-recipes-val", async (req, res) => {
  var { rating } = req.body;
  var top =1;
  top = Number(rating) + top;
  try {
    const reci = await pool.query(
      "SELECT *, AVG(rate) as avg FROM recipe INNER JOIN ratings ON recipe.id = ratings.id_recipe GROUP BY recipe.id HAVING AVG(rate) >= ?  && AVG(rate) < ? ",
      [rating, top]
    );
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
    thumbnail,
    author,
    filters
  } = req.body;

  const newRecipe = {
    name,
    instructions,
    prep_time,
    servings,
    calories_ps,
    thumbnail,
    author
  };
  try {
    await pool.query("INSERT INTO recipe set ?", [newRecipe]);
    const receta_guardada = await pool.query(
      "Select * FROM recipe WHERE name = ?",
      [name]
    );
    const id_recipe = receta_guardada[0]["id"];
    filters.map(async filter => {
      console.log(filter);
      const ingrediente = await pool.query(
        "SELECT * FROM ingredient WHERE name = ?",
        filter
      );
      const id_ingredient = ingrediente[0]["id"];
      const newSearch = {
        id_recipe,
        id_ingredient
      };
      await pool.query("INSERT INTO search SET ?", [newSearch]);
    });
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


router.post("/delete-recipe/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM recipe WHERE id = ?", [id]);
  } catch (e) {
    console.log(e);
  }
});

router.post("/delete-saved/:id", async (req, res) => {
  const { id } = req.params;
  const {userID} = req.body;

  try {
    await pool.query("DELETE FROM saves WHERE id_user = ? && id_recipe = ?", [userID, id]);
    res.json('Fino')
  } catch (e) {
    console.log(e);
  }
});

router.post("/change-rating/:id", async (req, res) => {
  console.log('hola');
  const { rating, userID } = req.body;
  const { id } = req.params;

  try {
    const res = await pool.query("INSERT INTO ratings (id_user, id_recipe, rate) VALUES (?,?,?) ON DUPLICATE KEY UPDATE  rate= ?", [userID, id, rating,rating]);
    res.json(true);
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
