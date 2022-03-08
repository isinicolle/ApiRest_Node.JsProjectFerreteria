const { Router } = require('express');
const controladorProducto = require('../controladores/controladorProducto');
const router = Router();

router.get('/listarProducto', controladorProducto.listarProductos);
router.get('/buscarProducto', controladorProducto.buscarProducto);
router.post('/guardarProducto', controladorProducto.guardar);
router.put('/modificarProducto', controladorProducto.ModificarProducto);
router.delete('/eliminarProducto', controladorProducto.eliminarProducto);

module.exports=router;