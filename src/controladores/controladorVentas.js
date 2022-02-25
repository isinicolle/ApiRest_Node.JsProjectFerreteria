const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

exports.listar = async (req,res,next) => {
    try{
       const listaVentas = await prisma.venta.findMany();
       if(!listaVentas){
           res.send("No se encontraron datos");
       }
       else{
           res.json({listaVentas});
       }
    } catch (error) {
       console.log(error)
       next(error);
   }
};

 exports.guardar = async (req,res,next) =>{
   try {
       const ventas = await prisma.venta.create({
           data: req.body,
       })
       //res.json(ventas);
       res.send("Resgistro de Venta Insertado")
   } catch (error) {
       console.log(error)
       next(error);
   }
};

exports.actualizar = async (req,res,next) =>{
   const {id} =req.query;
   const {fecha,id_cliente,RTN_estado,ISV,descuento} = req.body;

   if(!id)
   {
       res.send("Envie el id del envio");
   }
   else
   {
       try {
           const actualizarVenta = await prisma.venta.update({
                   where:
                   {
                     id_Venta: Number(id),
                   },
                   data: {fecha,id_cliente,RTN_estado,ISV,descuento},
               })
               //res.json(actualizarVenta)
               res.send("Registro Actualizado");
       } catch (error) {
           next(error)
       }
   }
};

exports.eliminar = async (req,res,next) =>{
   const {id} =req.query;
   if(!id)
   {
       res.send("Envie el id de la venta");
   }
   else
   {
       try {
           const eliminarVenta = await prisma.venta.delete({
                   where:
                   {
                     id_Venta: Number(id),
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
        res.send("Envie el id de la venta");
    }
    else
    {
        try {
            const buscarVenta = await prisma.venta.findUnique({
                    where:
                    {
                      id_Venta: Number(id),
                    },
                })
                if(!buscarVenta)
                {
                   res.send("No se encontraron datos");
                }
                else{
                   res.json(buscarVenta);
                //res.send("Registro Encontrado");
                }
                
        } catch (error) {
            next(error)
        }
    }
 };