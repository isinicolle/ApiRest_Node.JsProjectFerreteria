const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();


exports.listarUsuarioCliente = async (req,res,next) =>{
    try {
        const usuariocliente = await prisma.usuariosClientes.findMany();
        res.json(usuariocliente);
    } catch (error) {
        console.log(error)
        next(error);
    }
}