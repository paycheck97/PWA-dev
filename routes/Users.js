const express = require('express');
const router = express.Router();

const pool = require('../database');


router.get('/example', async  (req, res) => {
    console.log('por aqui pase');
    try{
        /*const pais = await pool.query('SELECT * FROM pais');
        const ciudad = await pool.query('SELECT * FROM ciudad');
        const aeropuerto = await pool.query('SELECT * FROM aeropuerto');
        const sta = ciudad[0];
        const ciudades = sta["nombre_ciudad"];
        const ejemplos = [
            {id: 1, firstName: 'John', lastName: 'Doe'},
            {id: 2, firstName: 'Mark', lastName: 'Dee'},
            {id: 3, firstName: 'Jared', lastName: 'Leto'},
        ]
            
        
        res.json(ciudad);
        console.log()*/
    } catch (e){
        console.log(e);
    }
});

module.exports = router;