const {PrismaClient} = require('@prisma/client') ;
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

