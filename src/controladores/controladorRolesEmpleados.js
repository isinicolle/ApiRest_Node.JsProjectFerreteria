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

exports.insertarRolesEmpleados = async (req,res,next) =>{
    
    try {
        const {descripcion}= req.body;
        const rolesEmpleados = await prisma.rolesEmpleados.create({
          data:{ descripcion:descripcion,
           
        },
        })
        res.json(rolesEmpleados);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.eliminarRolesEmpleados= async (req,res) =>{
    const {id_rol} =req.query;

    if(!id_rol)
    {
        res.send("Envie el id de registro");
    }
    else
    {
        try {
            const eliminarRolEmpleado = await prisma.rolesEmpleados.delete(
                {
                    where:
                    {
                        id_rol: Number(id_rol),
                    },
                })
                res.json(eliminarRolEmpleado)
        } catch (error) {
            next(error)
        }      
    }
}
