const { Router } = require('express');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const router = Router();

//trabajando con rutas
router.get('/listarEmpleados', controladorEmpleados.listarEmpleados);
//router.get('/buscarEmpleados', controladorEmpleados.buscarEmpleados);
router.post('/insertarEmpleados', controladorEmpleados.insertarempleadoprovicional);
router.delete('/eliminarEmpleados', controladorEmpleados.eliminarEmpleado);
router.put('/actualizarEmpleados', controladorEmpleados.actualizarEmpleados);
router.get('/idultimo', controladorEmpleados.id);

module.exports=router; 
