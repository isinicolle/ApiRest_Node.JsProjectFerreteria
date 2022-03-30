const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('../configuraciones/passportEmpleados');
const bcrypt = require('bcrypt');
const msj = require('../configuraciones/mensaje');
const emailer = require('../configuraciones/emailer');
const joi = require("@hapi/joi");

const validar = joi.object({
    nom_usuarioEmpleado: joi.string().min(5).max(50).required(),
    //estado: joi.bool().required(),
    contrasenia_empleado: joi.string().min(8).max(250).required(),
    id_empleado: joi.number().integer().required(),
    correo_empleado: joi.string().email().required(),
});

//listar Usuarios empleados
exports.listarUsuarioEmpleados = async (req, res, next) => {
    try {
        const usuarioEmpleados = await prisma.usuarioEmpleados.findMany();
        res.json(usuarioEmpleados);
    } catch (error) {
        console.log(error)
        next(error);
    }
}


exports.insertarUsuarioEmpleados = async (req, res, next) => {

        const {nom_usuarioEmpleado,contrasenia_empleado, correo_empleado,id_empleado}= req.body;
        const passwordHash = await bcrypt.hash(contrasenia_empleado,12);
    
            await prisma.usuarioEmpleados.create({
              data:{ 
                nom_usuarioEmpleado: nom_usuarioEmpleado,
                contrasenia_empleado: passwordHash,
                correo_empleado: correo_empleado,
                id_empleado: id_empleado,
                estado:true
            },
            })
            .then((data) => {
                console.log(data);
                emailer.sendMail(clientes.correo_usuario);
                res.send(data);
              })
              .catch((err) => {
                console.log(err);
                res.send("Usuario insertado con exito");
              });
    }
    

exports.eliminarUsuarioEmpleados = async (req, res) => {
    const { id_usuarioEmpleado } = req.query;

    if (!id_usuarioEmpleado) {
        res.send("Envie el id de registro");
    }
    else {
        try {
            const eliminarUsuarioEmpleado = await prisma.usuarioEmpleados.delete(
                {
                    where:
                    {
                        id_usuarioEmpleado: Number(id_usuarioEmpleado),
                    },
                })
            res.json(eliminarUsuarioEmpleado)
        } catch (error) {
            next(error)
        }
    }
}

exports.actualizarUsuarioEmpleados = async (req, res) => {
    try {
        const result = await validar.validateAsync(req.body);
        if (result.error) {
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
        }
        else {
            let { id_usuarioEmpleado } = req.query;
            const { nom_usuarioEmpleado, contrasenia_empleado, correo_empleado } = req.body;
            let { id_empleado, estado } = req.body;
            id_usuarioEmpleado = parseInt(id_usuarioEmpleado);
            id_empleado = parseInt(id_empleado);
            estado = parseInt(estado);
            if (!await buscarUsuarioEmpleado(id_usuarioEmpleado)) {
                res.send("Este usuario no existe")
            }
            else {
                const passwordHash = await bcrypt.hash(contrasenia_empleado, 12);
                await prisma.usuarioEmpleados.update({
                    where: { id_usuarioEmpleado: id_usuarioEmpleado },
                    data: {
                        nom_usuarioEmpleado: nom_usuarioEmpleado || undefined,
                        estado: estado || undefined,
                        contrasenia_empleado: passwordHash || undefined,
                        correo_empleado: correo_empleado || undefined,
                        id_empleado: id_empleado || undefined,
                    }
                }).then((data) => {
                    console.log(data);
                    res.send("Se actualizaron los datos");
                })
            }
        }
    }
    catch (error) {
        res.send("Error de datos");
        console.log(error);
    }
};

exports.buscarUEmpleado = async (req, res, next) => {
    const { id_usuarioEmpleado } = req.query;

    if (!id_usuarioEmpleado) {
        res.send("Envie el id de usuario");
    }
    else {
        try {
            const buscarUsuarioEmpleado = await prisma.usuarioEmpleados.findUnique(
                {
                    where:
                    {
                        id_usuarioEmpleado: Number(id_usuarioEmpleado),
                    },//
                })//
            res.json(buscarUsuarioEmpleado)
        } catch (error) {
            next(error)
        }
    }
}

async function buscarUsuarioEmpleado(id_usuarioEmpleado) {
    const buscar = await prisma.usuarioEmpleados.findMany({
        where: {
            id_usuarioEmpleado: id_usuarioEmpleado
        }
    });
    if (buscar.length >= 1) {
        return true; //retorna si no existe
    }
    else return false; //retorna si existe

};

exports.ValidarAutenticado = passport.ValidarAutenticado;

exports.loginUsuarioEmpleado = async (req, res) => {
    const { nom_usuarioEmpleado, contra_empleado } = req.body;

    if (!nom_usuarioEmpleado || !contra_empleado) {
        res.send("Debe ingresar todos los datos");
    }
    else {
        try {
            const buscarUsuarioEmpleado = await prisma.usuarioEmpleados.findFirst(
                {
                    where:
                    {
                        nom_usuarioEmpleado: nom_usuarioEmpleado,
                    }
                })

            if (buscarUsuarioEmpleado != null) {
                if (bcrypt.compareSync(contra_empleado, buscarUsuarioEmpleado.contrasenia_empleado)) {
                    if (buscarUsuarioEmpleado.estado == true) {

                        const token = passport.generarToken({ nom_usuarioEmpleado: buscarUsuarioEmpleado.nom_usuarioEmpleado });
                        console.log(token);

                        const data = {
                            token: token,
                            data: buscarUsuarioEmpleado
                        };
                        msj("Bienvenido", 200, data, res);
                    }
                    else {

                        res.send("Este usuario esta inactivo, comunicarse con servicio al cliente")
                    }
                }
                else {
                    console.log(nom_usuarioEmpleado, contra_empleado);
                    res.send("Usuario o contraseña incorrecto");
                }
            }
            else {
                res.send("Usuario o contraseña incorrecto")
            }
        } catch (error) {
            console.log(error);
            res.send("Ha ocurrido un error inesperado");
        }
    }
};

exports.Error = (res) => {
    msj("Debe estar autenticado", 200, [], res);
};

exports.recuperarContrasena = async (req, res, next) => {
    const { correo_empleado } = req.query;
    var contrasenia_empleado

    if (!correo_empleado) {
        res.send("Envie el correo de su Usuario");
        console.log('error')
    }
    else {

        contrasenia_empleado = (Math.floor(Math.random() * (99999 - 11111)) + 11111).toString();
        const passwordHash = await bcrypt.hash(contrasenia_empleado, 12)

        try {

            var buscarUser = await prisma.usuarioEmpleados.findFirst({
                where:
                {
                    correo_empleado: correo_empleado,
                },
            })

            const empleado = await prisma.usuarioEmpleados.update({
                where:
                {
                    id_usuarioEmpleado: Number(buscarUser.id_usuarioEmpleado),
                },
                data:
                {
                    contrasenia_empleado: passwordHash,
                }
            })

            emailer.sendMailPassword(empleado.correo_empleado, contrasenia_empleado);
            res.json("Correo: " + empleado.correo_empleado + " Clave nueva: " + contrasenia_empleado + " Ingrese nuevamente para cambiar su clave");

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
};