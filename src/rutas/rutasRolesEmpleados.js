const { Router } = require('express');
const controladorRolesEmpleados = require('../controladores/controladorRolesEmpleados');
const router = Router();


router.get('/listarRolesEmpleados', controladorRolesEmpleados.listarRolesEmpleados);
//router.get('/buscarRolesEmpleados', controladorRolesEmpleados.buscarRolesEmpleados);
router.post('/insertarRolesEmpleados', controladorRolesEmpleados.insertarRolesEmpleados);
router.delete('/eliminarRolesEmpleados', controladorRolesEmpleados.eliminarRolesEmpleados);
//router.put('/actualizarRolesEmpleados', controladorRolesEmpleados.actualizarRolesEmpleados);

module.exports=router; 