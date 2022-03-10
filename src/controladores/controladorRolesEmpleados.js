const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

const joi = require("@hapi/joi");

const validar = joi.object({
    descripcion: joi.string().min(5).max(50).required(),
});  

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
        const result = await validar.validate(req.body);
        if(result.error){
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
        }
        else{
        const {descripcion}= req.body;
        const rolesEmpleados = await prisma.rolesEmpleados.create({
          data:{ descripcion:descripcion,
           
        },
        })
        res.json(rolesEmpleados);}
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


exports.actualizarRolesEmpleados = async (req, res) => {
    try {
        const result = await validar.validate(req.body);
        if(result.error){
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
        }
        else{
        let { id_rol } = req.query;
        const { descripcion} = req.body;
        id_rol=parseInt(id_rol);
        
        if (!await buscarRol(id_rol))
        {
            res.send("Este rol no existe")
        }
        else{
          await prisma.rolesEmpleados.update({
              where:{id_rol:id_rol},
          data:{
            descripcion:descripcion|| undefined,
      
          }}).then((data)=>{
              console.log(data);
              res.send("Se actualizaron los datos");
          })
        }  }
    } catch (error) {
        res.send("Error de datos");
        console.log(error);
    }
  };
  

  async function buscarRol(id_rol)
{
  const buscar =await prisma.rolesEmpleados.findMany({where:{
    id_rol:id_rol
}});
    if (buscar.length>=1)
    {
        return true; //retorna si no existe
    }
    else return false; //retorna si existe

};
