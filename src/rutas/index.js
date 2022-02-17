const { Router } = require('express');
const controladorInicio = require('../controladores/controladorInicio');
const router = Router();

//trabajando con rutas
router.get('/', controladorInicio.Raiz);

module.exports=router; 