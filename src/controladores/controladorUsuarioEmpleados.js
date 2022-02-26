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

exports.actualizarUsuarioEmpleados = async (req, res) => {
    let { id_usuarioEmpleado } = req.query;
    const {nom_usuarioEmpleado ,contrasenia_empleado }= req.body;
    let {id_empleado} = req.body;
    id_usuarioEmpleado=parseInt(id_usuarioEmpleado);
      id_empleado= parseInt(id_empleado);
    if (!await buscarUsuarioEmpleado(id_usuarioEmpleado))
    {
        res.send("Este usuario no existe")
    }
    else{
      await prisma.usuarioEmpleados.update({
          where:{id_usuarioEmpleado:id_usuarioEmpleado},
      data:{
        nom_usuarioEmpleado:nom_usuarioEmpleado || undefined,
          contrasenia_empleado:contrasenia_empleado || undefined,
          id_empleado:id_empleado || undefined,
      }}).then((data)=>{
          console.log(data);
          res.send("Se actualizaron los datos");
      }).catch((error)=>{
          res.send("Error de datos");
          console.log(error);
      });
    }
  };


  async function buscarUsuarioEmpleado(id_usuarioEmpleado)
  {
    const buscar =await prisma.usuarioEmpleados.findMany({where:{
      id_usuarioEmpleado:id_usuarioEmpleado
  }});
      if (buscar.length>=1)
      {
          return true; //retorna si no existe
      }
      else return false; //retorna si existe
  
  };