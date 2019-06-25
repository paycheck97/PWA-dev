const express = require("express");
const router = express.Router();
const pool = require("../database");

router.post('/fav-recipe', async (req, res) => {
    const {
        id_recipe,
        id_user
    } = req.body;

    const save = {
        id_recipe,
        id_user
    };
    try{
        await pool.query("INSERT INTO saves SET ?", [save]);
        res.json('Receta guardada con exito.')
    }catch(e){
        console.log(e);
        res.json('En este momento no podemos cumplir su peticion.')
    }
})

module.exports = router;