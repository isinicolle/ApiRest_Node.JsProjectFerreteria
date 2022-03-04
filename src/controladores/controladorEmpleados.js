const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
const joi = require("@hapi/joi");

const validar = joi.object({
  nom_empleado:joi.string().min(3).required(),
   apellido_empleado: joi.string().min(2).max(50).required(),
   telefono_empleado: joi.string().min(8).max(20).required(),
   id_ciudad: joi.number().integer().required(),
   direccion_empleado: joi.string().min(10).max(50).required(),
    id_rol: joi.number().integer().required(),
   fnacimiento_empleado: joi.number().integer().required(),
  Estado: joi.bool().required()
});


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
        const result = await validar.validate(req.body);
        if(result.error){
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
        }
        else{
        const {nom_empleado , apellido_empleado,telefono_empleado, direccion_empleado,id_ciudad,id_rol,fnacimiento_empleado,Estado}= req.body;
        const empleados = await prisma.empleados.create({
          data:{ nom_empleado:nom_empleado,
           apellido_empleado:apellido_empleado,
           telefono_empleado:telefono_empleado,
            direccion_empleado:direccion_empleado,
            Ciudades:{connect:{id_ciudad:id_ciudad}},
            RolesEmpleados:{connect:{id_rol:id_rol}},
            fnacimiento_empleado:fnacimiento_empleado,
           Estado:Estado
        },
        include:{Ciudades:true,RolesEmpleados:true}
        })
        res.json(empleados);}
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
    try {

        const result = await validar.validate(req.body);
        if(result.error){
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
        }
        else{
        let { id_empleado } = req.query;
    const { nom_empleado , apellido_empleado,telefono_empleado, direccion_empleado,Estado} = req.body;
    let {id_ciudad,id_rol,fnacimiento_empleado} = req.body;
    id_empleado=parseInt(id_empleado);
    id_rol= parseInt(id_rol);
    fnacimiento_empleado= parseInt(fnacimiento_empleado);
      id_ciudad= parseInt(id_ciudad);
   
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
        telefono_empleado:telefono_empleado|| undefined,
         direccion_empleado:direccion_empleado|| undefined,
         id_ciudad:id_ciudad|| undefined,
         id_rol:id_rol|| undefined,
         fnacimiento_empleado:fnacimiento_empleado|| undefined,
        Estado:Estado || undefined
      }})
      .then((data)=>{
          console.log(data);
          res.send("Se actualizaron los datos");
      })} }
    } catch (error) {
        console.log(error)
        next(error);
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

