const { application } = require('express');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const rutaDepartamento = require('./rutas/rutaDepartamento');
const rutaProveedor = require('./rutas/rutaProveedores');
const rutaCompra = require('./rutas/rutaCompras');
const rutaDetalleCompra = require('./rutas/rutaDetalleCompra');
const rutaCarrito = require('./rutas/rutaCarrito');
const rutaCategoria = require('./rutas/rutaCategoria');
const rutaMarca = require('./rutas/rutaMarcas');
const app = express();
app.use('/producto/img', express.static(path.join(__dirname, 'public/img')));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('json spaces',2);

//app.use('/api/', rutas);
app.use('/api/proveedores/',rutaProveedor);
app.use('/api/departamentos/',rutaDepartamento);
app.use('/api/compra/',rutaCompra);
app.use('/api/detallecompra/',rutaDetalleCompra);
app.use('/api/categoria/',rutaCategoria);
app.use('/api/marca', rutaMarca);
app.use('/img',express.static(__dirname+'/public/img'));
app.use('/api/clientes/',require('./rutas/rutaclientes'));
app.use('/api/direccionesEnvio/',require('./rutas/rutaDireccionesEnvio'));
app.use('/api/usuarioCliente',require('./rutas/rutaUsuarioCliente'));
app.use('/api/empleados/',require('./rutas/rutasEmpleados'));
app.use('/api/usuarioempleados/',require('./rutas/rutasUsuarioEmpleados'));
app.use('/api/rolesempleados/',require('./rutas/rutasRolesEmpleados'));
app.use('/api/empresaenvios/',require('./rutas/rutasEmpresaEnvios'));
app.use('/api/categoria/',require('./rutas/rutaCategoria'));
app.use('/api/marca', require('./rutas/rutaMarcas'));
app.use('/api/envios', require('./rutas/rutaEnvios'));
app.use('/api/imagen', require('./rutas/rutaImagen'));
app.use('/api/productos', require('./rutas/rutaProductos'));

//VENTAS
app.use('/api/ventas', require('./rutas/rutasVentas'));

//VENTAS DETALLE
app.use('/api/ventasdetalle', require('./rutas/rutasDetalleVentas'));
app.use('/api/carrito',rutaCarrito);

//definir el puerto que se usara en el servidor
app.listen(6001, ()=>
{
    console.log("Servidor iniciado en el puerto 6001");
});