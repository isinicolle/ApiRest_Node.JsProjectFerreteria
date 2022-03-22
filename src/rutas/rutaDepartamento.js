const { Router } = require('express');
const controladorDepartamentos = require('../controladores/controladorDepartamentos');
const router = Router();

//trabajando con rutas
router.get('/listar', controladorDepartamentos.listarDepartamentos);
router.post('/agregar', controladorDepartamentos.agregarDepartamento);
router.delete('/eliminar', controladorDepartamentos.eliminarDepartamento);
router.put('/modificar', controladorDepartamentos.actualizarDepartamento);

module.exports=router; 