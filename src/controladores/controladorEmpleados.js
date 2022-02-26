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

exports.actualizarEmpleados = async (req, res) => {
    let { id_empleado } = req.query;
    const { nom_empleado , apellido_empleado,correo_empleado,telefono_empleado, direccion_empleado} = req.body;
    let {Estado,id_ciudad,id_rol,fnacimiento_empleado} = req.body;
    id_empleado=parseInt(id_empleado);
    id_rol= parseInt(id_rol);
    fnacimiento_empleado= parseInt(fnacimiento_empleado);
      id_ciudad= parseInt(id_ciudad);
    Estado=parseInt(Estado);
    if (!await buscarEmpleado(id_empleado))
    {
        res.send("Este empleado no existe")
    }
    else{
      await prisma.empleados.update({
          where:{id_empleado:id_empleado},
      data:{
        nom_empleado:nom_empleado|| undefined,
        apellido_empleado:apellido_empleado|| undefined,
        correo_empleado:correo_empleado|| undefined,
        telefono_empleado:telefono_empleado|| undefined,
         direccion_empleado:direccion_empleado|| undefined,
         id_ciudad:id_ciudad|| undefined,
         id_rol:id_rol|| undefined,
         fnacimiento_empleado:fnacimiento_empleado|| undefined,
        Estado:Estado || undefined
      }}).then((data)=>{
          console.log(data);
          res.send("Se actualizaron los datos");
      }).catch((error)=>{
          res.send("Error de datos");
          console.log(error);
      });
    }
  };
  

  async function buscarEmpleado(id_empleado)
{
  const buscar =await prisma.empleados.findMany({where:{
    id_empleado:id_empleado
}});
    if (buscar.length>=1)
    {
        return true; //retorna si no existe
    }
    else return false; //retorna si existe

};

