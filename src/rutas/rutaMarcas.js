const { Router } = require('express');
const controladorMarca = require('../controladores/controladorMarca');
const router = Router();

router.get('/ProductoPorMarca', controladorMarca.ProductoPorMarca);
router.get('/listarMarcas', controladorMarca.listarMarcas);
router.get('/buscarMarca', controladorMarca.buscarMarca);
router.post('/guardarMarca', controladorMarca.guardarMarca);
router.put('/modificarMarca', controladorMarca.ModificarMarca);
router.delete('/eliminarMarca', controladorMarca.eliminarMarca);
module.exports=router;
