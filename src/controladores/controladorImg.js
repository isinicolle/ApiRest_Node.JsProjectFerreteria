//const ModeloProducto = require('../modelos/modeloProductos');
const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
const ModeloProducto = prisma.productos;
const fs = require('fs');
const path = require('path');

exports.Recibir = async (req,res) => {
        const { filename } = req.file; 
        const id = req.query.id; 
        var BuscarProducto = await ModeloProducto.findUnique({
            where: {
                id_producto: Number(id)
            }
        });
        if (!BuscarProducto){
            res.send("Error");
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/' + BuscarProducto.imagen))
            if (!buscarImagen){
                console.log(buscarImagen);
            }
            else{
                try{
                    fs.unlinkSync(path.join(__dirname, '../public/img/' + BuscarProducto.imagen));
                    console.log("Imagen eliminada");
                }
                catch(error){
                    console.log(error);
                    console.log("No se elimino");
                }
        }
            BuscarProducto.imagen = filename;
            await prisma.productos.update({
                where: {
                    id_producto: Number(id)
                },
                data: {
                 imagen: BuscarProducto.imagen 
                }
            })
            .then(( data)=>{
                console.log(data);
                res.send(data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
}