const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

//listar empresaEnvios
exports.listarEmpresaEnvios = async (req,res,next) =>{
    try {
        const empresaEnvios = await prisma.empresasEnvio.findMany();
        res.json(empresaEnvios);
    } catch (error) {
        console.log(error)
        next(error);
    }
}