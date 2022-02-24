const { Router } = require('express');
const controladorDireccionesEnvio= require('../controladores/controladorDireccionesEnvio');
const router = Router();

//trabajando con rutas
router.get('/listarDireccionesEnvio', controladorDireccionesEnvio.listarDireccionesEnvio);
router.post('/insertarDireccionesEnvio', controladorDireccionesEnvio.insertarDireccionenvio);

module.exports=router; 