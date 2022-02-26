const { Router } = require('express');
const controladorEmpresaEnvios = require('../controladores/controladorEmpresaEnvios');
const router = Router();


router.get('/listarEmpresaEnvios', controladorEmpresaEnvios.listarEmpresaEnvios);
//router.get('/buscarEmpresaEnvios', controladorEmpresaEnvios.buscarEmpresaEnvios);
router.post('/insertarEmpresaEnvios', controladorEmpresaEnvios.insertarEmpresaEnvios);
router.delete('/eliminarEmpresaEnvios', controladorEmpresaEnvios.eliminarEmpresaEnvios);
//router.put('/actualizarEmpresaEnvios', controladorEmpresaEnvios.actualizarEmpresaEnvios);

module.exports=router; 