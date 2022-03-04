const ModeloProducto = require('../modelos/modeloProductos');
const fs = require('fs');
const path = require('path');

exports.Recibir = async (req,res) => {
        const { filename } = req.file; 
        const id = req.query.id; 
        var BuscarProducto = await ModeloProducto.findOne({
            where: {
                id_producto: id
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
            await BuscarProducto.save()
            .then(( data)=>{
                console.log(data);
                res.send(data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
}