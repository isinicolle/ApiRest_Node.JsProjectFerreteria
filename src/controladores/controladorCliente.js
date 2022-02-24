const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();


exports.listarClientes = async (req,res,next) =>{
    try {
        const clientes = await prisma.clientes.findMany();
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next(error);
    }
}


exports.insertarcliente = async (req,res,next) =>{
    try {
        const clientes = await prisma.clientes.create({
            data: req.body,
        })
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next(error);
    }
}