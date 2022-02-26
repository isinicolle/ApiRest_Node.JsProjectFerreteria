const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const modeloCompra = prisma.compras;
const modeloProducto = prisma.productos;
const modeloDetalleCompra = prisma.detalleCompras;

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
  const {idProducto,idCompra,precio,cantidad} = req.body;
  await modeloDetalleCompra.create({
      data:{
        id_producto:idProducto //A cambiar
        ,Compras:{connect:{id_compra:idCompra}} ,
        precio:precio,
        cantidad:cantidad
      }
  }).then((data)=>{
      res.send("Registro almacenado");
      console.log(data);
  }).catch((error)=>{
      res.send("Error al guardar");
      console.log(error);
  })
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