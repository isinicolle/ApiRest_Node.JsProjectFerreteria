const { Router } = require('express');
const controladorUsuarioEmpleados = require('../controladores/controladorUsuarioEmpleados');
const router = Router();

//trabajando con rutas
router.get('/listarUsuarioEmpleados', controladorUsuarioEmpleados.listarUsuarioEmpleados);
router.get('/buscarUsuarioEmpleados', controladorUsuarioEmpleados.buscarUEmpleado);
router.post('/insertarUsuarioEmpleados', controladorUsuarioEmpleados.insertarUsuarioEmpleados);
router.delete('/eliminarUsuarioEmpleados', controladorUsuarioEmpleados.eliminarUsuarioEmpleados);
router.put('/actualizarUsuarioEmpleados', controladorUsuarioEmpleados.actualizarUsuarioEmpleados);

router.post('/loginUsuarioEmpleado', controladorUsuarioEmpleados.loginUsuarioEmpleado);
router.get('/error', controladorUsuarioEmpleados.Error);
router.get('/recuperarclave', controladorUsuarioEmpleados.recuperarContrasena);

module.exports = router; 
