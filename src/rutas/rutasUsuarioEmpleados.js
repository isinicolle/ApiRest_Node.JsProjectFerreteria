const { Router } = require('express');
const controladorUsuarioEmpleados = require('../controladores/controladorUsuarioEmpleados');
const router = Router();

//trabajando con rutas
router.get('/listarUsuarioEmpleados', controladorUsuarioEmpleados.listarUsuarioEmpleados);
//router.get('/buscarUsuarioEmpleados', controladorUsuarioEmpleados.buscarUsuarioEmpleados);
router.post('/insertarUsuarioEmpleados', controladorUsuarioEmpleados.insertarUsuarioEmpleados);
//router.delete('/eliminarUsuarioEmpleados', controladorUsuarioEmpleados.eliminarUsuarioEmpleados);
//router.put('/actualizarUsuarioEmpleados', controladorUsuarioEmpleados.actualizarUsuarioEmpleados);

module.exports=router; 
