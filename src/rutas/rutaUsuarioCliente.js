const { Router } = require('express');
const controladorUsuarioCliente = require('../controladores/controladorUsuarioCliente');
const router = Router();

//trabajando con rutas
router.get('/listarUsuarioCliente', controladorUsuarioCliente.listarUsuarioCliente);
router.get('/buscarUsuarioCliente', controladorUsuarioCliente.buscarUsuarioCliente);
router.post('/insertarUsuarioCliente', controladorUsuarioCliente.insertarUsuariocliente);
router.delete('/eliminarUsuarioCliente', controladorUsuarioCliente.eliminarUsuariocliente);
module.exports=router; 