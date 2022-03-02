const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const modeloCarrito = prisma.carrito;
const modeloItemCarrito = prisma.carritoItem;
const modeloDetalleVenta = prisma.detallesVentas;
const modeloVenta = prisma.venta;
const modeloUsuario = prisma.usuariosClientes

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
                   data: {fecha:fecha,Clientes:{connect:{id_cliente:id_cliente}},RTN_estado:RTN_estado,ISV:ISV,descuento:descuento},
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
 
 exports.procesarCarrito = async(req,res)=>{
    let {idUsuario} = req.query;
    let {rtn,idDireccionEnvio} = req.body;
    //Conseguir el carrito del usuario
    let Carrito = await modeloCarrito.findFirst({
        where:{id_usuarioCliente:Number(idUsuario)},
    select:{id_carrito:true,CarritoItem:{select:{Productos:true,cantidad:true}}}});
   //Conseguir el cliente del usuario
        let Cliente = await modeloUsuario.findFirst({
            where:{id_usuarioCliente:Number(idUsuario)},
            select:{
                Clientes:true
            }
        });
        //Realizar la venta
        let VentaR;
    await modeloVenta.create({
       data:{
           fecha:new Date(Date.now()).toISOString(),
            Clientes:{connect:{id_cliente:Cliente.Clientes.id_cliente}},
            RTN_estado:rtn,
            ISV:.15,
            descuento:0,
            DireccionesEnvio:{connect:{id_direccionEnvio:idDireccionEnvio}}
       }}).then((data)=>{
        console.log(data);
        VentaR=data;
    }).catch((err)=>{
        console.log(err);
    });   

       //Añadir el detalle
       
       Carrito.CarritoItem.forEach(
        async function (elemento){
           await modeloDetalleVenta.create({
               data:{
                   Productos:{connect:{ id_producto:elemento.Productos.id_producto}},
                   Venta:{connect:{id_Venta:VentaR.id_Venta}},
                   precio:elemento.Productos.precio_actual,
                   cantidad:elemento.cantidad
               }
           }).then((data)=>{
               console.log(data);
           }).catch((err)=>{
               console.log(err);
           })
        }
    );

    await modeloItemCarrito.deleteMany({where:{id_Carrito:Carrito.id_carrito}}).then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    });
     res.send(VentaR);       
    }; //Fin función procesar carrito

 exports.historialVentas = async(req,res)=>{
        let {idCliente} = req.query;
        await modeloVenta.findMany({
            where:{id_cliente:Number(idCliente)},
            include:{DetallesVentas:{include:{Productos:true}}}
        }).then((data)=>{
            res.json(data);
        }).catch((err)=>{
            console.log(err);
            res.send("Error inesperado");
        })
    }
