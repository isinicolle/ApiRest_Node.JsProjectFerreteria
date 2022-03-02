const {PrismaClient} = require('@prisma/client') ;
const { on } = require('nodemailer/lib/xoauth2');
const prisma = new PrismaClient();


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
        res.send("Envie el id de cliente");
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

exports.DireccionEnvioXUsuario = async (req,res,next) =>{
    const {id_usuarioCliente} =req.body;

    if(!id_usuarioCliente)
    {
        res.send("Envie el id de cliente");
    }
    else
    {
        try {
            const buscarDireccionEnvio = await prisma.direccionesEnvio.findMany(
                {
                    where:
                    {
                        id_usuarioCliente: Number(id_usuarioCliente),
                    },
                    select:{id_direccionEnvio:true,direccion:true,direccion_opcional:true,Ciudades:{select:{id_ciudad:true,nombre_ciudad:true,codigoPostal:true,Departamentos:{select:{id_departamento:true,nombreDepartamento:true}}}}}
                })//
                res.json(buscarDireccionEnvio)
        } 
        catch (error) {
            next(error)
        }     
    }
}

exports.insertarDireccionenvio = async (req,res,next) =>{
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




