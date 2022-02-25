const { Router } = require('express');
const controladorDireccionesEnvio= require('../controladores/controladorDireccionesEnvio');
const router = Router();

//trabajando con rutas
router.get('/listarDireccionesEnvio', controladorDireccionesEnvio.listarDireccionesEnvio);
router.post('/insertarDireccionesEnvio', controladorDireccionesEnvio.insertarDireccionenvio);
router.delete('/eliminarDireccionesEnvio', controladorDireccionesEnvio.eliminarDireccionEnvio);

module.exports=router; 