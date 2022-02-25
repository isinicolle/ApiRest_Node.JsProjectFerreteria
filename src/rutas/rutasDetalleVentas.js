const { Router } = require('express');
const controladorVentasDetalle = require('../controladores/controladorDetalleVentas');
const router = Router();

router.get('/listar', controladorVentasDetalle.listar);
router.post('/guardar', controladorVentasDetalle.guardar);
router.put('/actualizar', controladorVentasDetalle.actualizar);
router.delete('/eliminar', controladorVentasDetalle.eliminar);
router.get('/buscarid', controladorVentasDetalle.buscarId);

module.exports=router; 