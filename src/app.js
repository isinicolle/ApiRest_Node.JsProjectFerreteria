const express = require('express');
const morgan = require('morgan');
const rutas = require('./rutas');
const rutaDepartamento = require('./rutas/rutaDepartamento');
const rutaProveedor = require('./rutas/rutaProveedores');
const rutaCompra = require('./rutas/rutaCompras');
const rutaDetalleCompra = require('./rutas/rutaDetalleCompra');
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('json spaces',2);
app.use('/api/', rutas);
app.use('/api/proveedores/',rutaProveedor);
app.use('/api/departamentos/',rutaDepartamento);
app.use('/api/compra/',rutaCompra);
app.use('/api/detallecompra/',rutaDetalleCompra);
//definir el puerto que se usara en el servidor
app.listen(6001, ()=>
{
    console.log("Servidor iniciado en el puerto 6001");
});