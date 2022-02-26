const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

//listar Usuarios empleados
exports.listarUsuarioEmpleados = async (req,res,next) =>{
    try {
        const usuarioEmpleados = await prisma.usuarioEmpleados.findMany();
        res.json(usuarioEmpleados);
    } catch (error) {
        console.log(error)
        next(error);
    }
}