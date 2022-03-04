const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
const joi = require("@hapi/joi");

const validar = joi.object({
    nombre_empresa: joi.string().min(3).max(50).required(),
    direccion_empresa: joi.string().min(3).max(50).required(),
    telefono_empresa: joi.string().min(8).max(15).required(),
    id_ciudad: joi.number().integer().required(),
    estado: joi.bool().required(),
    correo_empresa: joi.string().min(10).max(50).email().required(),
});
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

exports.insertarEmpresaEnvios = async (req,res,next) =>{
    
    try {
        const result = await validar.validate(req.body);
        if(result.error){
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
        }
        else{
        const {nombre_empresa,direccion_empresa,telefono_empresa,id_ciudad ,estado,correo_empresa}= req.body;
        const empresaEnvios = await prisma.empresasEnvio.create({
          data:{ nombre_empresa:nombre_empresa,   
            direccion_empresa:direccion_empresa,
            telefono_empresa:telefono_empresa,  
            Ciudades:{connect:{id_ciudad:id_ciudad}},   
            estado:estado ,         
            correo_empresa:correo_empresa ,
        },
        include:{Ciudades:true}
        })
        res.json(empresaEnvios);}
    } catch (error) {
        console.log(error)
        next(error);
    }
}


exports.eliminarEmpresaEnvios= async (req,res) =>{
    const {id_empresaEnvio} =req.query;

    if(!id_empresaEnvio)
    {
        res.send("Envie el id de registro");
    }
    else
    {
        try {
            const eliminarEmpresaEnvios = await prisma.empresasEnvio.delete(
                {
                    where:
                    {
                        id_empresaEnvio: Number(id_empresaEnvio),
                    },
                })
                res.json(eliminarEmpresaEnvios)
        } catch (error) {
            next(error)
        }      
    }
}

exports.actualizarEmpresaEnvios = async (req, res) => {
    try {
        const result = await validar.validate(req.body);
        if(result.error){
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
        }
        else{
        let { id_empresaEnvio } = req.query;
    const { nombre_empresa,direccion_empresa,telefono_empresa,correo_empresa}= req.body;
    let {estado,id_ciudad} = req.body;
    id_empresaEnvio=parseInt(id_empresaEnvio);
      id_ciudad= parseInt(id_ciudad);
    estado=parseInt(estado);
    if (!await buscarEmpresaEnvios(id_empresaEnvio))
    {
        res.send("Esta empresa de envios no existe")
    }
    else{
      await prisma.empresasEnvio.update({
          where:{id_empresaEnvio:id_empresaEnvio},
      data:{
        nombre_empresa:nombre_empresa || undefined,   
        direccion_empresa:direccion_empresa || undefined,
        telefono_empresa:telefono_empresa || undefined,        
        id_ciudad:id_ciudad|| undefined,
        estado:estado || undefined,
        correo_empresa:correo_empresa || undefined
      }}).then((data)=>{
          console.log(data);
          res.send("Se actualizaron los datos");
      })
    }}
    } catch (error) {
        res.send("Error de datos");
        console.log(error);
    }
    
  };


  async function buscarEmpresaEnvios(id_empresaEnvio)
  {
    const buscar =await prisma.empresasEnvio.findMany({where:{
      id_empresaEnvio:id_empresaEnvio
  }});
      if (buscar.length>=1)
      {
          return true; //retorna si no existe
      }
      else return false; //retorna si existe
  
  };
  
