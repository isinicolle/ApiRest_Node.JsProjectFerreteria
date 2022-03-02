const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

const joi = require("@hapi/joi");
const { text } = require('express');

const validar = joi.object({
    direccion : joi.string().min(2).max(50).required(),
    id_ciudad: joi.number().integer().required(),
    id_usuarioCliente: joi.number().integer().required(),
    direccion_opcional: joi.string().min(2).max(50).required(),
});

exports.listarDireccionesEnvio = async (req,res,next) =>{
    try {
        const direccionesEnvio = await prisma.direccionesEnvio.findMany();
        res.json(direccionesEnvio);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

//buscar cliente
exports.buscarDireccionEnvio = async (req,res,next) =>{
    const {id_direccionEnvio} =req.query;

    if(!id_direccionEnvio)
    {
        res.send("Envie el id de direccion de envio");
    }
    else
    {
        try {
            const buscarDireccionEnvio = await prisma.direccionesEnvio.findUnique(
                {
                    where:
                    {
                        id_direccionEnvio: Number(id_direccionEnvio),
                    },//
                })//
                res.json(buscarDireccionEnvio)
        } catch (error) {
            next(error)
        }
       
           
    }
}

exports.insertarDireccionenvio = async (req,res,next) =>{
    const result = await validar.validate(req.body);
    if(result.error)
    {
        res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");

    
        
    }
    else{
        try {
            const direccionesEnvio = await prisma.direccionesEnvio.create({
                data: req.body,
            })
            res.json(direccionesEnvio);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

}

exports.eliminarDireccionEnvio= async (req,res) =>{
    const {id_direccionEnvio} =req.query;

    if(!id_direccionEnvio)
    {
        res.send("Envie el id de registro");
    }
    else
    {
        try {
            const eliminarDireccionEnvio = await prisma.direccionesEnvio.delete(
                {
                    where:
                    {
                        id_direccionEnvio: Number(id_direccionEnvio),
                    },//
                })//
               
                res.json(eliminarDireccionEnvio)
        } catch (error) {
            next(error)
        }
       
           
    }
}

exports.actualizarDireccionEnvio= async (req,res) =>{
    const {id_direccionEnvio} =req.query;
    const {direccion,id_ciudad,id_usuarioCliente,direccion_opcional} = req.body;


    if(!id_direccionEnvio)
    {
        res.send("Envie el id de la direccion Envio");
    }
    else
    {
        try {
      
            const direccionEnvio = await prisma.direccionesEnvio.update({
            where:
            {
                id_direccionEnvio: Number(id_direccionEnvio),
            },
            data: 
            {
                direccion : direccion,
                id_ciudad: id_ciudad,
                id_usuarioCliente: id_usuarioCliente,
                direccion_opcional: direccion_opcional,
            }
            
            })
            res.json(direccionEnvio);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
   
}




