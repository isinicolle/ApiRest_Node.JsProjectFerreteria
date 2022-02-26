const { Router } = require('express');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const router = Router();

//trabajando con rutas
router.get('/listarEmpleados', controladorEmpleados.listarEmpleados);
//router.get('/buscarEmpleados', controladorEmpleados.buscarEmpleados);
router.post('/insertarEmpleados', controladorEmpleados.insertarEmpleados);
router.delete('/eliminarEmpleados', controladorEmpleados.eliminarEmpleado);
router.put('/actualizarEmpleados', controladorEmpleados.actualizarEmpleados);

module.exports=router; 
