const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
const ModeloProducto = prisma.productos;

exports.img = async(req, res)=>{

        res.send("Hola");

}