const { Router } = require('express');
const controladorUsuarioCliente = require('../controladores/controladorUsuarioCliente');
const router = Router();

//trabajando con rutas
router.get('/listarUsuarioCliente', controladorUsuarioCliente.listarUsuarioCliente);
router.get('/buscarUsuarioCliente', controladorUsuarioCliente.buscarUsuarioCliente);

router.post('/insertarUsuarioCliente', controladorUsuarioCliente.insertarUsuariocliente);
router.delete('/eliminarUsuarioCliente', controladorUsuarioCliente.eliminarUsuariocliente);
router.put('/actualizarUsuarioCliente', controladorUsuarioCliente.actualizarCliente);

router.put('/actualizarUsuarioEstadoCliente', controladorUsuarioCliente.actualizarEstadoCliente);
router.put('/actualizarclave', controladorUsuarioCliente.actualizarClave);


router.get('/recoveryclave', controladorUsuarioCliente.recuperarContrasena);

router.post('/loginUsuarioCliente', controladorUsuarioCliente.loginUsuarioCliente);
router.get('/error',controladorUsuarioCliente.Error);

module.exports=router; 