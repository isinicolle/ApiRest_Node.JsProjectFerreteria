const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const modeloProveedor = prisma.proveedores;

exports.listarProveedores = async (req, res) => {
  const listarProveedor = await modeloProveedor.findMany({});
  if (!listarProveedor || listarProveedor.length == 0) {
    res.send("No hay datos en la tabla");
  } else {
    res.json(listarProveedor);
  }
};

exports.agregarProveedor = async (req, res) => {
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
        Estado:1
      },
      include:{Ciudades:true}
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.send("Ocurrio un error");
    });
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
    }).catch((error)=>{
        res.send("Error de datos");
        console.log(error);
    });
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
