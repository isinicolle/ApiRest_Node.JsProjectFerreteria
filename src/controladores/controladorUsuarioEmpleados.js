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

exports.insertarUsuarioEmpleados = async (req,res,next) =>{
    
    try {
        const { id_usuarioEmpleado,nom_usuarioEmpleado ,contrasenia_empleado ,id_empleado}= req.body;
        const usuarioEmpleados = await prisma.usuarioEmpleados.create({
          data:{  id_usuarioEmpleado:id_usuarioEmpleado,
          nom_usuarioEmpleado:nom_usuarioEmpleado,
          contrasenia_empleado:contrasenia_empleado,
          Empleados:{connect:{id_empleado:id_empleado}},
        },
        include:{Empleados:true}
        })
        res.json(usuarioEmpleados);
    } catch (error) {
        console.log(error)
        next(error);
    }
}


exports.eliminarUsuarioEmpleados= async (req,res) =>{
    const {id_usuarioEmpleado} =req.query;

    if(!id_usuarioEmpleado)
    {
        res.send("Envie el id de registro");
    }
    else
    {
        try {
            const eliminarUsuarioEmpleado = await prisma.usuarioEmpleados.delete(
                {
                    where:
                    {
                        id_usuarioEmpleado: Number(id_usuarioEmpleado),
                    },
                })
                res.json(eliminarUsuarioEmpleado)
        } catch (error) {
            next(error)
        }      
    }
}