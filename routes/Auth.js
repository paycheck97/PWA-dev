const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const pool = require("../database");
process.env.SECRET_KEY = "secretHat";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const verify = {
    email,
    password
  };
  try {
    const check = await pool.query("SELECT * FROM user WHERE email = ?", [
      email
    ]);
    if (check.length > 0) {
      if (bcrypt.compareSync(verify.password, check[0]["password"])) {
        console.log("success");
        user = {
          id: check[0]["id"],
          email: check[0]["email"],
          name: check[0]["name"],
          last_name: check[0]["last_name"],
          password: check[0]["password"],
          state: check[0]['state']
        };
        let token = jwt.sign(user, process.env.SECRET_KEY, {
          expiresIn: 1440
        });
        var decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        res.json(token);
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
    password,
    answer
  };
  try {
    const check = await pool.query("SELECT * FROM user WHERE email = ?", [
      email
    ]);
    if (check.length > 0) {
      res.json("Existe un usuario con ese correo");
      console.log("fail");
    } else {
      const hash = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hash;
      await pool.query("INSERT INTO user set ?", [newUser]);
      console.log("success");
      let token = jwt.sign(newUser, process.env.SECRET_KEY, {
        expiresIn: 1440
      });
      console.log(token);
      res.json("Haz creado un nuevo usuario.");
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
    const check = await pool.query(
      "SELECT * FROM user WHERE email = ? AND answer = ?",
      [email, answer]
    );
    if (check.length > 0) {
      const hash = bcrypt.hashSync(newPass.password, 10);
      newPass.password = hash;
      await pool.query("UPDATE user set password = ? WHERE email = ?", [
        newPass.password,
        newPass.email
      ]);
      console.log("success");
      res.send(true);
    } else {
      res.send(false);
      console.log("fail");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
