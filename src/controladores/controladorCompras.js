const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const modeloCompra = prisma.compras;
const modeloProveedor = prisma.proveedores;
const modeloEmpleado = prisma.empleados;
const joi = require("@hapi/joi");


const validarAgregar = joi.object({
    idProv:joi.number().required(),
    idEmpleado:joi.number().required(),
    isv:joi.number().required() ,
    descuento: joi.number().required()
})
const validarModificar = joi.object({
    idProv:joi.number(),
    idEmpleado:joi.number(),
    isv:joi.number(),
    descuento: joi.number()
})

exports.listarCompras = async (req, res) => {
 const listarCompras = await modeloCompra.findMany();
 if (!listarCompras || listarCompras.length==0)
 {
    res.send("No hay datos en la tabla");
 }
 else{
    res.json(listarCompras);
 }
};

exports.agregar = async (req, res) => {
    try 
  {
      await validarAgregar.validateAsync(req.body);
      const {idProv,idEmpleado,isv,descuento} = req.body;
      await modeloCompra.create({
      data:{
          Proveedores:{connect:{id_prov:idProv}},
          Empleados:{connect:{id_empleado:idEmpleado}}, //Esto a cambiar
          isv:isv,
          descuento:descuento,
          fecha_compra:new Date(Date.now()).toISOString() //Cambiar esto
      }
  }).then((data)=>{
      res.send("Registro almacenado");
      console.log(data);
  }).catch((error)=>{
      res.send("Error al guardar");
      console.log(error);
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
exports.eliminar = async (req, res) => {
 let {idCompra} = req.query;
 idCompra= parseInt(idCompra);
 if (!await buscarCompra(idCompra))
 {
    res.send("No se encontró esta compra");
 }
 else
 {
    await modeloCompra.delete({where:{
        id_compra:idCompra
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
        let {idCompra} = req.query;
    idCompra = parseInt(idCompra);
    const{fechaCompra,idProv,idEmpleado,isv,descuento} = req.body;
    if (!await buscarCompra(idCompra))
    {
       res.send("No se encontró esta compra");
    }
    else
    {
       await modeloCompra.update({where:{
           id_compra:idCompra
       },
        data:{
            Proveedores:{connect:{id_prov:idProv || undefined}},
            Empleados: { connect:{ id_empleado:idEmpleado || undefined}}, //Esto a cambiar
            isv:isv || undefined,
            descuento:descuento || undefined,
            fecha_compra:fechaCompra || undefined, //Cambiar esto
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
 

    async function buscarCompra(idCompra)
{
    const buscar =await modeloCompra.findMany({where:{
        id_compra:idCompra
    }});
        if (buscar.length>=1)
        {
            return true; //retorna si no existe
        }
        else return false; //retorna si existe
};