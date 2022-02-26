const { Router } = require('express');
const controladorEnvios = require('../controladores/controladorEnvios');
const router = Router();

router.get('/listar', controladorEnvios.listar);
router.post('/guardar', controladorEnvios.guardar);
router.delete('/eliminar', controladorEnvios.eliminar);
router.put('/actualizar', controladorEnvios.actualizar);
router.get('/buscarid', controladorEnvios.buscarId);
//router.get('/buscarrastreo', controladorEnvios.buscarRastreo);

module.exports=router; 