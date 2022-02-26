const { Router } = require('express');
const controladorCompra = require('../controladores/controladorCompras');
const router = Router();

//trabajando con rutas
router.get('/listar', controladorCompra.listarCompras);
router.post('/agregar', controladorCompra.agregar);
router.delete('/eliminar', controladorCompra.eliminar);
router.put('/modificar', controladorCompra.actualizar);
module.exports=router; 