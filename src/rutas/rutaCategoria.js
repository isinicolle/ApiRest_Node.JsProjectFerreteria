const { Router } = require('express');
const controladorCategoria = require('../controladores/controladorCategoria');
const router = Router();

router.get('/listarCategoriaPorProducto', controladorCategoria.listarCategoriaPorProducto);
router.get('/listarCategoria', controladorCategoria.listarCategoria);
router.get('/buscarCategoria', controladorCategoria.buscarCategoria);
router.post('/guardarCategoria', controladorCategoria.guardarCategoria);
router.put('/modificarCategoria', controladorCategoria.ModificarCategoria);
router.delete('/eliminarCategoria', controladorCategoria.eliminarCategoria);

module.exports=router; 