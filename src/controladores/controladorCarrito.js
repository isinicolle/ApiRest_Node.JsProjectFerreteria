const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const res = require("express/lib/response");
const mensaje = require("../configuraciones/mensaje");
const prisma = new PrismaClient();
const modeloCarrito = prisma.carrito;
const modeloItemCarrito = prisma.carritoItem;
const modeloDetalleVenta = prisma.detallesVentas;
const modeloVenta = prisma.venta;
const modeloUsuario = prisma.usuariosClientes

exports.MostrarCarrito= async (req,res,next)=>{
    let {idUsuario} = req.query;
    console.log(idUsuario);
    if (!idUsuario || idUsuario==undefined){
    mensaje('Error al iniciar sesion',200,idUsuario,res);
    next(mensaje);
    }else
    {
        idUsuario = parseInt(idUsuario);
    let Carrito = await modeloCarrito.findFirst({
        where:{id_usuarioCliente:idUsuario},
        select:{CarritoItem:{select:{Productos:true,Productos:{include:{Marcas:true,Categorias:true}},cantidad:true}, }
            }
  

});
    Carrito = await calcularPrecio(Carrito);
    res.json(Carrito); 

} 
};  

exports.nuevoCarrito= async(req,res)=>{
    let {idUsuario} = req.query;
    idUsuario = parseInt(idUsuario);
    await modeloCarrito.create({data:{
        usuariosClientes:{connect:{id_usuarioCliente:idUsuario}}
        
    }}).then((data)=>{
        res.json("Carrito creado");
        console.log(data)
    }).catch((err)=>{
        res.json("Ocurrio un error");
        console.log(err);
    }); 
};
exports.agregarProducto = async(req,res)=>{
    let {idUsuario} = req.query;
    let {idProducto} = req.body; 
    idUsuario = parseInt(idUsuario);
    idProducto = parseInt(idProducto); 
    let{Cantidad} = req.body;
    const Carrito = await modeloCarrito.findFirst({where:{id_usuarioCliente:idUsuario}});
    const buscarProd = await modeloItemCarrito.findMany({
        where:{
            id_Carrito:Carrito.id_carrito,
            id_producto:idProducto 
        } 
    });
    if (buscarProd.length>0)
    {
        Cantidad += buscarProd[0].cantidad;
        modeloItemCarrito.updateMany({
            where:{
                id_Carrito:Carrito.id_carrito,
                id_producto:idProducto
            },
            data:{
                cantidad:Cantidad
            }
        }).then((data)=>{
            res.send(data);

        }).catch((err)=>{
            res.send("Se encontró un error");
            console.log(err);
        })
    
        
    } else
    { 
        modeloItemCarrito.create({data:{
        Carrito:{connect:{id_carrito:Carrito.id_carrito}},
        Productos:{connect:{id_producto:idProducto}},
        cantidad:Cantidad
    }}).then((data)=>{
        res.json("Producto agregado");
        console.log(data);
    }).catch((err)=>{
        res.json("Error");
        console.log(err);
    });
}
}

exports.modificarCarrito = async(req,res)=>{
    let {idUsuario} = req.query;
    let {idProducto} = req.body;
    idUsuario = parseInt(idUsuario);
    idProducto = parseInt(idProducto);
    const{Cantidad} = req.body;
    const Carrito = await modeloCarrito.findFirst({where:{id_usuarioCliente:idUsuario}});
    modeloItemCarrito.updateMany({
        where:{ 
                Productos:{id_producto:idProducto},
               Carrito:{ id_carrito:Carrito.id_carrito}
        },
        data:{
        cantidad:Cantidad || undefined
    }}).then((data)=>{
        res.json("Producto modificado");
        console.log(data);
    }).catch((err)=>{
        res.json("Error ");
        console.log(err);
    });
};
    async function  calcularPrecio(Carrito){
            if(!Carrito){
                return 0
            }else{

                let suma=0;
                Carrito.CarritoItem.forEach(
                    async function (elemento){
                        elemento.total=elemento.Productos.precio_actual*elemento.cantidad;
                        suma+=elemento.total;
                    }
                );
                Carrito.totalCarrito=suma;
                return Carrito;
            }
    }
