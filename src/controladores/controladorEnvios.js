const {PrismaClient} = require('@prisma/client') ;
const { text } = require('express');
const prisma = new PrismaClient();
const joi = require("@hapi/joi");

const validar = joi.object({
    num_rastreo: joi.string().min(2).required(),
    id_venta: joi.number().integer().required(),
    id_empresaEnvio: joi.number().integer().required(),
});

 exports.listar = async (req,res,next) => {
     try{
        const listaEnvios = await prisma.envios.findMany();
        if(!listaEnvios){
            res.send("No se encontraron datos");
        }
        else{
            res.json({listaEnvios});
        }
     } catch (error) {
        console.log(error)
        next(error);
    }
 };

 exports.guardar = async (req,res,next) =>{
   try {
        const result = await validar.validate(req.body);
        if(result.error){
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
        }
        else{
            const envios = await prisma.envios.create({
                data: req.body,
            })
            //res.json(envios);
            res.send("Registro de Envio Insertado");
        }
       
   } catch (error) {
       console.log(error)
       next(error);
   }
};

exports.actualizar = async (req,res,next) =>{
   const {id} =req.query;
   const {num_rastreo,id_venta,id_empresaEnvio} = req.body;

   if(!id)
   {
       res.send("Envie el id del envio");
   }
   else
   {
       try {
            const result = await validar.validate(req.body);
            if(result.error){
                res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
            }
            else{
                const actualizarEnvio = await prisma.envios.update({
                    where:
                    {
                      id_envio: Number(id),
                    },
                    data: {num_rastreo,id_venta,id_empresaEnvio},
                })
                //res.json(actualizarEnvio)
                res.send("Registro Actualizado");
            }
                
       } catch (error) {
           next(error)
       }
   }
};

exports.eliminar = async (req,res,next) =>{
   const {id} =req.query;
   if(!id)
   {
       res.send("Envie el id del envio");
   }
   else
   {
       try {
            const eliminarEnvio = await prisma.envios.delete({
                where:
                {
                    id_envio: Number(id),
                },
                })
                //res.json(eliminarEnvio)
                res.send("Registro Eliminado");    
       } catch (error) {
           next(error)
       }
   }
};

exports.buscarId = async (req,res,next) =>{
   const {id} =req.query;
   if(!id)
   {
       res.send("Envie el id del envio");
   }
   else
   {
       try {
            const buscarEnvio = await prisma.envios.findUnique({
                where:
                {
                    id_envio: Number(id),
                },
                })
                if(!buscarEnvio)
                {
                   res.send("No se encontraron datos");
                }
                else{
                   res.json(buscarEnvio);
                //res.send("Registro Encontrado");
            }
       } catch (error) {
           next(error)
       }
   }
};

/*
exports.buscarRastreo = async (req,res,next) =>{
    const {rastreo} =req.query;
    if(!rastreo)
    {
        res.send("Envie el numero de rastreo del envio");
    }
    else
    {
        try {
            const buscarRastreo = await prisma.envios.findMany({
                    where:
                    {
                      num_rastreo: '%'+rastreo+'%',
                    },
                })
                if(!buscarRastreo)
                {
                   res.send("No se encontraron datos");
                }
                else{
                   res.json(buscarRastreo);
                //res.send("Registro Encontrado");
                }
                
        } catch (error) {
            next(error)
        }
    }
 };
*/