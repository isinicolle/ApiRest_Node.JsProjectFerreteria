const { Router } = require('express');
const controladorCliente = require('../controladores/controladorCliente');
const router = Router();

//trabajando con rutas
router.get('/listarClientes', controladorCliente.listarClientes);

module.exports=router; 