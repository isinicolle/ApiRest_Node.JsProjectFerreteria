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