const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
const ModeloCategoria = prisma.categorias;

exports.listarCategoria = async(req, res)=>{
    const listarCategoria = await ModeloCategoria.findAll();
    if(listarCategoria.length == 0){
        res.send("No existen datos");
    }else{
        res.json(listarCategoria);
    }
}

exports.guardarCategoria = async (req, res) => {
    try {
        const Categoria = await prisma.categorias.create({
            data: req.body,
        })
        res.json(Categoria);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

exports.eliminarCategoria = async (req, res) => {
    const {id} = req.query;
    if(!id) {
        res.send("Envie el id de registro");
    }
    else {
        try {
            const eliminarCategoria = await prisma.categorias.delete(
                {
                    where: {
                        id_categoria: Number(id),
                    }
                }
            )
            res.json(eliminarCategoria)
        } catch (error) {
            next(error)
        }
        }
}

exports.buscarCategoria = async (req, res) => {
    const {id} = req.query;
    if(!id) {
        res.send("Envie el id de registro");
    }
    else {
        try {
            const buscarCategoria = await prisma.categorias.findUnique(
                {
                    where: {
                        id_categoria: Number(id),
                    }
                }
            )
            res.json(buscarCategoria)
        } catch (error) {
            next(error)
        }
        }
}

exports.ModificarCategoria = async (req, res) => {
    
    try {
        const {id_categoria} =req.query;
        const {descripcion_categoria, estado} = req.body;
        const categoria = await prisma.categorias.update({
        where:
        {
            id_categoria: id_categoria,
        },
        data: 
        {
            descripcion_categoria:descripcion_categoria,
            estado: estado,
        }
        
        })
        res.json(categoria);
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.listarCategoriaPorProducto = async (req, res) => {
    let {idcategoria} = req.query;
    idcategoria = parseInt(idcategoria);
    const categoria = await ModeloCategoria.findMany({
        where:
        {
            id_categoria: idcategoria
        },
        select:{
            Productos:{
                select:{descripcion_producto:true, precio_actual: true},
            }
        }
    });
    res.json(categoria);
}