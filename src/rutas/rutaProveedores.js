const { Router } = require('express');
const controladorProveedor = require('../controladores/controladorProveedor');
const router = Router();

//trabajando con rutas
router.get('/listar', controladorProveedor.listarProveedores);
router.post('/agregar', controladorProveedor.agregarProveedor);
router.delete('/eliminar', controladorProveedor.eliminarProveedor);
router.put('/modificar', controladorProveedor.actualizarProveedor);
router.put('/eliminarestado', controladorProveedor.eliminarEstado);
module.exports=router; 