const { Router } = require('express');
const controladorCiudades = require('../controladores/controladorCiudad');
const router = Router();

router.get('/listarCiudades', controladorCiudades.listarCiudadesxDepartamento);
module.exports=router; 