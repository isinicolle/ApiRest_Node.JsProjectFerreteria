const { Router } = require('express');
const controladorCliente = require('../controladores/controladorCliente');
const router = Router();

//trabajando con rutas
router.get('/listarClientes', controladorCliente.listarClientes);
router.get('/buscarCliente', controladorCliente.buscarCliente);
router.post('/insertarCliente', controladorCliente.insertarcliente);
router.delete('/eliminarCliente', controladorCliente.eliminarCliente);
router.put('/actualizarCliente', controladorCliente.actualizarCliente);
router.put('/actualizarEstadoCliente', controladorCliente.actualizarEstadoCliente);


module.exports=router; 