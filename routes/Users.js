const express = require('express');
const router = express.Router();

const pool = require('../database');


router.get('/example', async  (req, res) => {
    console.log('por aqui pase');
    try{
        const pais = await pool.query('SELECT * FROM pais');
        const ciudad = await pool.query('SELECT * FROM ciudad');
        const aeropuerto = await pool.query('SELECT * FROM aeropuerto');
        res.json(ciudad);
    } catch (e){
        console.log(e);
    }
});

module.exports = router;