const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
const joi = require("@hapi/joi");

const validar = joi.object({
    id_detalleVenta: joi.optional(),
    id_producto: joi.number().integer().required(),
    id_venta: joi.number().integer().required(),
    precio: joi.number().required(),
    cantidad: joi.number().integer().required()
});

const validar2 = joi.object({
    
});

exports.listar = async (req,res,next) => {
    try{
       const listaVentasDetalle = await prisma.detallesVentas.findMany();
       if(!listaVentasDetalle){
           res.send("No se encontraron datos");
       }
       else{
           res.json({listaVentasDetalle});
       }
    } catch (error) {
       console.log(error)
       next(error);
   }
};

 exports.guardar = async (req,res,next) =>{
   try {
        const result = await validar.validateAsync(req.body);
        if(result.error){
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
        }
        else{
            const ventas = await prisma.detallesVentas.create({
                data: req.body,
            })
            //res.json(ventas);
            res.send("Registro de Detalle de Venta Insertado");
        }
       
   } catch (error) {
       console.log(error)
       next(error);
   }
};

exports.actualizar = async (req,res,next) =>{
   const {id} =req.query;
   const {id_producto,id_venta,precio,cantidad} = req.body;

   if(!id)
   {
       res.send("Envie el id del envio");
   }
   else
   {
       try {
            const result = await validar.validate(req.body);
            if(result.error){
                res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
            }
            else{
                const actualizarVentaDetalle = await prisma.detallesVentas.update({
                    where:
                    {
                      id_detalleVenta: Number(id),
                    },
                    data: {id_producto,id_venta,precio,cantidad},
                })
                //res.json(actualizarVentaDetalle)
                res.send("Registro Actualizado");
            }
           
       } catch (error) {
           next(error)
       }
   }
};

exports.eliminar = async (req,res,next) =>{
   const {id} =req.query;
   if(!id)
   {
       res.send("Envie el id del detalle de la venta");
   }
   else
   {
       try {
           const eliminarVenta = await prisma.detallesVentas.delete({
                   where:
                   {
                     id_detalleVenta: Number(id),
                   },
               })
               //res.json(eliminarVenta)
               res.send("Registro Eliminado");
       } catch (error) {
           next(error)
       }
   }
};

exports.buscarId = async (req,res,next) =>{
    const {id} =req.query;
    if(!id)
    {
        res.send("Envie el id del detalle de la venta");
    }
    else
    {
        try {
            const buscarVentasDetalle = await prisma.detallesVentas.findUnique({
                    where:
                    {
                      id_detalleVenta: Number(id),
                    },
                })
                if(!buscarVentasDetalle)
                {
                   res.send("No se encontraron datos");
                }
                else{
                   res.json(buscarVentasDetalle);
                //res.send("Registro Encontrado");
                }
                
        } catch (error) {
            next(error)
        }
    }
 };