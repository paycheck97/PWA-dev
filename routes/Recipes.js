const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../database");
const jwt = require("jsonwebtoken");

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

//Buscar por ingrediente
router.post("/search-recipes-i", async (req, res) => {
  var { filters } = req.body;
  var whole = [];
  var check = true;
  var firstTime = true;
  var in_recetas = [];

  console.log(filters);
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

      console.log("primero", whole);
      for (i = whole.length - 1; i >= 0; i--) {
        check = false;
        id_recipes.map(id_recipe => {
          if (whole[i]["id_recipe"] == id_recipe["id_recipe"]) {
            check = true;
          }
        });
        if (check == false) {
          console.log("entro");
          whole.splice(i, 1);
        }
      }
      console.log("segundo", whole);
      if (whole.length < 1) {
        firstTime = false;
      }
    });

    Promise.all(ser).then(async () => {
      console.log("tercero", whole);
      for (i = whole.length - 1; i >= 0; i--) {
        try {
            const aux = await pool.query("SELECT * FROM recipe WHERE id = ?", [
              whole[i]["id_recipe"]
            ])
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const verify = {
    email,
    password
  };
  console.log(verify.email);
  console.log(verify.password);
  try {
    const check = await pool.query("SELECT * FROM user WHERE email = ?", [
      email
    ]);
    console.log(check[0]["password"]);
    if (check.length > 0) {
      if (bcrypt.compareSync(verify.password, check[0]["password"])) {
        console.log("success");
        res.json(true);
      } else {
        console.log("success/fail");
        res.json(false);
      }
    } else {
      res.send("Existe un usuario con ese correo");
      console.log("fail");
    }
  } catch (e) {
    console.log(e);
  }
});

//Regitro de Usuario
router.post("/register", async (req, res) => {
  const { email, name, last_name, password, answer } = req.body;

  const newUser = {
    email,
    name,
    last_name,
    password,
    answer
  };
  try {
    const check = await pool.query("SELECT * FROM user WHERE email = ?", [
      email
    ]);
    if (check.length > 0) {
      res.send("Existe un usuario con ese correo");
      console.log("fail");
    } else {
      const hash = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hash;
      await pool.query("INSERT INTO user set ?", [newUser]);
      console.log("success");
    }
  } catch (e) {
    console.log(e);
  }
});

//Change password
router.post("/change-password", async (req, res) => {
  const { email, password, answer } = req.body;

  const newPass = {
    email,
    password,
    answer
  };
  try {
    const check = await pool.query("SELECT * FROM user WHERE email = ? AND answer = ?", [
      email, answer
    ]);
    if (check.length > 0) {
      const hash = bcrypt.hashSync(newPass.password, 10);
      newPass.password = hash;
      await pool.query("UPDATE user set password = ? WHERE email = ?", [newPass.password, newPass.email]);
      console.log("success");
      res.send(true)

    } else {
      res.send(false);
      console.log("fail");
    }
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
