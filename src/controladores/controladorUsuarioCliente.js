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

exports.insertarUsuariocliente = async (req,res,next) =>{
    try {
        const clientes = await prisma.usuariosClientes.create({
            data: req.body,
        })
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next(error);
    }
}