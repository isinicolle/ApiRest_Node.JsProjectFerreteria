const { Router } = require('express');
const controladorDetalleCompra = require('../controladores/controladorDetalleCompra');
const router = Router();
//trabajando con rutas

router.get('/listar', controladorDetalleCompra.listarDetalleCompras);
router.post('/agregar', controladorDetalleCompra.agregar);
router.delete('/eliminar', controladorDetalleCompra.eliminar);
router.put('/modificar', controladorDetalleCompra.actualizar);
module.exports=router; 