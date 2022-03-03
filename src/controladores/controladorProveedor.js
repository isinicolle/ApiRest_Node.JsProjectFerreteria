const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const modeloProveedor = prisma.proveedores;
const joi = require("@hapi/joi");
const { string } = require("@hapi/joi");



const validarModificar = joi.object({
  nomProv:joi.string().min(5),
  telefonoProv:joi.string().alphanum().min(8).max(11) ,
  correoProv:joi.string().email().min(5),
  direccionProv:joi.string().min(5),
  idCiudad: joi.number(),
  Estado: joi.boolean()
});

const validarAgregar = joi.object({
  nomProv:joi.string().min(5).required(),
  telefonoProv:joi.string().alphanum().min(8).max(11).required() ,
  correoProv:joi.string().email().min(5).required(),
  direccionProv:joi.string().min(5).required(),
  idCiudad: joi.number().required()
});

exports.listarProveedores = async (req, res) => {
  const listarProveedor = await modeloProveedor.findMany({});
  if (!listarProveedor || listarProveedor.length == 0) {
    res.send("No hay datos en la tabla");
  } else {
    res.json(listarProveedor);
  }
};

exports.agregarProveedor = async (req, res,next) => {
  try{
    const result = await validarAgregar.validateAsync(req.body);
    const { nomProv,telefonoProv,correoProv,direccionProv } = req.body;
    let {idCiudad} = req.body
    await modeloProveedor
      .create({
        data: {
          nom_prov:nomProv,
          telefono_prov:telefonoProv,
          correo_prov:correoProv,
          direccion_prov:direccionProv,
          Ciudades:{connect:{id_ciudad:idCiudad}},
          Estado:true
        },
        include:{Ciudades:true}
      }).then((data)=>{
        res.send(data);
        console.log(data);
      })

  }catch(err){
    console.log(err);
    if (err.isJoi)
    {
      res.send(err.details[0].message)
    }
    else{
      res.send("error inesperado");
    }
  } 
 
};
exports.eliminarProveedor = async (req, res) => {
  let { idProveedor } = req.query;
  idProveedor = parseInt(idProveedor);
  if (!buscarProveedor(idProveedor)) {
    res.send("Este proveedor no existe");
  } else {
    await modeloProveedor
      .delete({
        where: {
          id_prov: idProveedor,
        },
      })
      .then((data) => {
        console.log(data);
        res.send("Departamento eliminado");
      })
      .catch((error) => {
        console.log(error);
        res.send("Ocurrio un error");
      });
  }
};

exports.eliminarEstado = async(req,res)=>{
   let {idProveedor} = req.query;
    idProveedor=parseInt(idProveedor);
      if (!buscarProveedor(idProveedor)) {
        res.send("Este proveedor no existe");
      } else {
        await modeloProveedor.update({where:{
            id_prov:idProveedor
        },
    data:{
        Estado:0
    }
    }).then((data)=>{
        res.send("Proveedor eliminado");
        console.log(data);
    }).catch((error)=>{
        res.send("Error al eliminar");
    });
      }
    
};
exports.actualizarProveedor = async (req, res) => {
  try
  {
  const result = await validarModificar.validateAsync(req.body);
  let { idProveedor } = req.query;
  const { nomProv,telefonoProv,correoProv,direccionProv } = req.body;
  let {estado,idCiudad} = req.body;
  idProveedor=parseInt(idProveedor);
    idCiudad= parseInt(idCiudad);
  estado=parseInt(estado);
  if (!await buscarProveedor(idProveedor))
  {
      res.send("Este proveedor no existe")
  }
  else{
    await modeloProveedor.update({
        where:{id_prov:idProveedor},
    data:{
        nom_prov:nomProv || undefined,
        telefono_prov:telefonoProv || undefined,
        correo_prov:correoProv || undefined,
        direccion_prov:direccionProv || undefined,
        id_ciudad:idCiudad || undefined,
        Estado:estado || undefined
    }}).then((data)=>{
        console.log(data);
        res.send("Se actualizaron los datos");
    });
  }
} catch(err){
  console.log(err);
  if (err.isJoi)
  {
    res.send(err.details[0].message)
  }
  else{
    res.send("error inesperado");
  }
}
};


    async function buscarProveedor(idProveedor)
{
  const buscar =await modeloProveedor.findMany({where:{
    id_prov:idProveedor
}});
    if (buscar.length>=1)
    {
        return true; //retorna si no existe
    }
    else return false; //retorna si existe

};
