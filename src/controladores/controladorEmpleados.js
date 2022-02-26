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
        const {nom_empleado , apellido_empleado,correo_empleado,telefono_empleado, direccion_empleado,id_ciudad,id_rol,fnacimiento_empleado,Estado}= req.body;
        const empleados = await prisma.empleados.create({
          data:{ nom_empleado:nom_empleado,
           apellido_empleado:apellido_empleado,
           correo_empleado:correo_empleado,
           telefono_empleado:telefono_empleado,
            direccion_empleado:direccion_empleado,
            Ciudades:{connect:{id_ciudad:id_ciudad}},
            RolesEmpleados:{connect:{id_rol:id_rol}},
            fnacimiento_empleado:fnacimiento_empleado,
           Estado:Estado
        },
        include:{Ciudades:true,RolesEmpleados:true}
        })
        res.json(empleados);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.eliminarEmpleado= async (req,res) =>{
    const {id_empleado} =req.query;

    if(!id_empleado)
    {
        res.send("Envie el id de registro");
    }
    else
    {
        try {
            const eliminarEmpleado = await prisma.empleados.delete(
                {
                    where:
                    {
                        id_empleado: Number(id_empleado),
                    },
                })
                res.json(eliminarEmpleado)
        } catch (error) {
            next(error)
        }      
    }
}

