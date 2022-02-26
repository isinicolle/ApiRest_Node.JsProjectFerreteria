const { Router } = require('express');
const controladorDireccionesEnvio= require('../controladores/controladorDireccionesEnvio');
const router = Router();

//trabajando con rutas
router.get('/listarDireccionesEnvio', controladorDireccionesEnvio.listarDireccionesEnvio);
router.get('/buscarDireccionesEnvio', controladorDireccionesEnvio.buscarDireccionEnvio);
router.post('/insertarDireccionesEnvio', controladorDireccionesEnvio.insertarDireccionenvio);
router.delete('/eliminarDireccionesEnvio', controladorDireccionesEnvio.eliminarDireccionEnvio);
router.put('/actualizarDireccionEnvio', controladorDireccionesEnvio.actualizarDireccionEnvio);

module.exports=router; 