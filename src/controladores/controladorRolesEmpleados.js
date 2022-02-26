const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

//listar roles empleados
exports.listarRolesEmpleados = async (req,res,next) =>{
    try {
        const rolesEmpleados = await prisma.rolesEmpleados.findMany();
        res.json(rolesEmpleados);
    } catch (error) {
        console.log(error)
        next(error);
    }
}