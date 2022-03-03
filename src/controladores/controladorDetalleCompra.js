const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const modeloCompra = prisma.compras;
const modeloProducto = prisma.productos;
const modeloDetalleCompra = prisma.detalleCompras;
const joi = require("@hapi/joi");

const validarAgregar = joi.object({
    idProducto:joi.number().integer().required(),
    idCompra: joi.number().required(),
    precio:joi.number().required(),
    cantidad: joi.number().integer().required()
})
const validarModificar = joi.object({
    idProducto:joi.number().integer(),
    idCompra: joi.number().integer(),
    precio:joi.number(),
    cantidad: joi.number().integer()
})

exports.listarDetalleCompras = async (req, res) => {
 const listarDetalleCompras = await modeloDetalleCompra.findMany();
 if (!listarDetalleCompras || listarDetalleCompras.length==0)
 {
    res.send("No hay datos en la tabla");
 }
 else{
    res.json(listarDetalleCompras);
 }
};

exports.agregar = async (req, res) => {
    try
  {
    await validarAgregar.validateAsync(req.body);
      const {idProducto,idCompra,precio,cantidad} = req.body;
  await modeloDetalleCompra.create({
      data:{
        Productos:{connect:{id_producto:idProducto}} 
        ,Compras:{connect:{id_compra:idCompra}} ,
        precio:precio,
        cantidad:cantidad
      }
  }).then((data)=>{
      res.send("Registro almacenado");
      console.log(data);
  });
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
exports.eliminar = async (req, res) => {
 let {idDetalleCompra} = req.query;
    idDetalleCompra = parseInt(idDetalleCompra);
 if (!await buscarDetalleCompra(idDetalleCompra))
 {
    res.send("No se encontró esta compra");
 }
 else
 {
    await modeloDetalleCompra.delete({where:{
        id_detalleCompra:idDetalleCompra
    }}).then((data)=>{
        res.send("Se eliminó");
        console.log(data);
    }).catch((error)=>{
        res.send("No se pudo eliminar");
        console.log(error);
    })
 }
};
/*exports.eliminarEstado = async(req,res)=>{
  
    
};*/
exports.actualizar = async (req, res) => {
    try

   { 
    await validarModificar.validateAsync(req.body);
    let {idDetalleCompra} = req.query;
    idDetalleCompra = parseInt(idDetalleCompra);
    const{idProducto,idCompra,precio,cantidad} = req.body;
    if (!await buscarDetalleCompra(idDetalleCompra))
    {
       res.send("No se encontró este detalle compra");
    }
    else
    {
       await modeloDetalleCompra.update({where:{
           id_detalleCompra:idDetalleCompra
       },
        data:{
        id_producto:idProducto || undefined //A cambiar
        ,Compras:{connect:{id_compra:idCompra || undefined}} ,
        precio:precio || undefined,
        cantidad:cantidad || undefined
        
        }
        }).then((data)=>{
           res.send("Se modificó");
           console.log(data);
       }).catch((error)=>{
           res.send("No se pudo modificar");
           console.log(error);
       })
    }
}   catch(err){
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


    async function buscarDetalleCompra(idDetalleCompra)
{
    const buscar =await modeloDetalleCompra.findMany({where:{
        id_detalleCompra:idDetalleCompra
    }});
        if (buscar.length>=1)
        {
            return true; //retorna si no existe
        }
        else return false; //retorna si existe
};