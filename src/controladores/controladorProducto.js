const { bool } = require('@hapi/joi');
const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
const ModeloProducto = prisma.productos;
const msj = require('../configuraciones/mensaje');
exports.listarProductos = async(req, res)=>{
    const listarProductos = await ModeloProducto.findMany({include:{Marcas:true,Categorias:true}});
    if(listarProductos.length == 0){
        res.send("No existen datos");
    }else{
        res.json(listarProductos);
    }
}
exports.guardar = async (req, res) => {
    try {
        const Productos = await prisma.productos.create({
            data: req.body,
        })
        res.json(Productos);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

exports.eliminarProducto = async (req, res) => {
    try {
        const {id_producto} =req.query;
        const {estado} = req.body;
        
        const productos = await prisma.productos.update({
        where:
        {
            id_producto:Number(id_producto)
        },
        data: 
        {
            estado:!estado
        }
        
        })
        res.json(productos);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
exports.buscarProductoFiltro = async(req,res)=>{  
    const {s} = req.query;
    if (!s){
     msj('Error no se ha encontrado query',404,req.query,res);
    res.send(msj)
    }
    else{
         let num = Number(s);
        if ((Number.isInteger(num)))
           { 
               const buscarProductos = await prisma.productos.findFirst({
                where:{ 
                    id_producto:num
                }
            })
            res.send(buscarProductos)
        }
        else
        {
            console.log(s)
            const buscarProductos = await prisma.productos.findMany({
                where:{ 
                    descripcion_producto:{contains:s}
                },
                include:{Marcas:true,Categorias:true}
            })
            res.send(buscarProductos)
        }
   
}
}
exports.buscarProducto = async (req, res) => {
    const {id_producto} = req.query;
    if(!id_producto) {
        res.send("Envie el id de registro");
    }
    else {
        try {
            const buscarProducto = await prisma.productos.findUnique(
                {
                    where: {
                        id_producto: Number(id_producto),
                    },
                    select:{descripcion_producto:true,cantidad_por_unidad:true,costo_producto:true,precio_actual:true,stock:true,descuento:true,estado:true,imagen:true,Marcas:{select:{id_marca:true,descripcion_marca:true}},Categorias:{select:{id_categoria:true,descripcion_categoria:true}}}

                }
            )
            res.json(buscarProducto)
        } catch (error) {
            next(error)
        }
        }
}

exports.ModificarProducto = async (req, res) => {
    
    try {
        const {id_producto} =req.query;
        const {descripcion_producto, costo_producto, precio_actual, stock, descuento} = req.body;
        const productos = await prisma.productos.update({
        where:
        {
            id_producto:Number(id_producto)
        },
        data: 
        {
            descripcion_producto: descripcion_producto,
            costo_producto:costo_producto,
            precio_actual:precio_actual,
            stock:stock,
            descuento:descuento
        }
        
        })
        res.json(productos);
    } catch (error) {
        console.log(error);
        next(error);
    }
}