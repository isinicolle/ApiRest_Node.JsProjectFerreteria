const { Router } = require('express');
const controladorProducto = require('../controladores/controladorProducto');
const router = Router();

router.get('/buscarProducto', controladorProducto.buscarProducto);

module.exports=router; 