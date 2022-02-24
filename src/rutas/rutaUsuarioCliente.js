const { Router } = require('express');
const controladorUsuarioCliente = require('../controladores/controladorUsuarioCliente');
const router = Router();

//trabajando con rutas
router.get('/listarUsuarioCliente', controladorUsuarioCliente.listarUsuarioCliente);
router.post('/insertarUsuarioCliente', controladorUsuarioCliente.insertarUsuariocliente);
module.exports=router; 