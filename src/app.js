const express = require('express');
const morgan = require('morgan');

const rutas = require('./rutas');
const app = express(); 

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.set('json spaces',2);

app.use('/api/', rutas );
app.use('/api/clientes/',require('./rutas/rutaclientes'));

//definir el puerto que se usara en el servidor
app.listen(6001, ()=>
{
    console.log("Servidor iniciado en el puerto 6001");
});