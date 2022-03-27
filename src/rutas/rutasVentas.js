const { Router } = require('express');
const controladorVentas = require('../controladores/controladorVentas');
const router = Router();

router.get('/listar', controladorVentas.listar);
router.post('/guardar', controladorVentas.guardar);
router.put('/actualizar', controladorVentas.actualizar);
router.delete('/eliminar', controladorVentas.eliminar);
router.get('/buscarid', controladorVentas.buscarId);
router.post('/procesarCarrito', controladorVentas.procesarCarrito);
router.get('/historial', controladorVentas.historialVentas);
router.get('/ventaid', controladorVentas.listarV);

module.exports=router; 