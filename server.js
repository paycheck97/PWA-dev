const express = require('express');
const morgan = require('morgan');   //Muestra peticiones en consola
const cors = requier('cors');
const bodyParser = require('body-parser');

const app = express();
app.set('port', process.env.PORT || 5000);



//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//globales
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();

});

//routes
var Users = require('./routes/Users')
app.use(require('./routes/Users'));


//servidor
app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));

});