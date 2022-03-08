const { Router } = require('express');
const controladorEnvios = require('../controladores/controladorEnvios');
const AUTH = require('../controladores/controladorUsuarioCliente');
const router = Router();

router.get('/listar', AUTH.ValidarAutenticado ,controladorEnvios.listar);
router.post('/guardar', controladorEnvios.guardar);
router.delete('/eliminar', controladorEnvios.eliminar);
router.put('/actualizar', controladorEnvios.actualizar);
router.get('/buscarid', controladorEnvios.buscarId);
//router.get('/buscarrastreo', controladorEnvios.buscarRastreo);

module.exports=router;