const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

//listar empleados
exports.listarEmpleados = async (req,res,next) =>{
    try {
        const empleados = await prisma.empleados.findMany();
        res.json(empleados);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.insertarEmpleados = async (req,res,next) =>{
    try {
        const empleados = await prisma.empleados.create({
            data: req.body,
        })
        res.json(empleados);
    } catch (error) {
        console.log(error)
        next(error);
    }
}
