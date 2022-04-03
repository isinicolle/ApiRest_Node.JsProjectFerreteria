const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
const ModeloMarca = prisma.marcas;

exports.listarMarcas = async(req, res)=>{
    try {
        const marcas = await prisma.marcas.findMany();
        res.json(marcas);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.guardarMarca = async (req, res) => {
    try {
        const Marcas = await prisma.marcas.create({
            data: req.body,
        })
        res.json(Marcas);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

exports.eliminarMarca = async (req, res) => {
    const {id} = req.query;
    if(!id) {
        res.send("Envie el id de registro");
    }
    else {
        try {
            const eliminarMarca = await prisma.marcas.delete(
                {
                    where: {
                        id_marca: Number(id),
                    }
                }
            )
            res.json(eliminarMarca)
        } catch (error) {
            next(error)
        }
        }
}

exports.buscarMarca = async (req, res) => {
    const {id} = req.query;
    if(!id) {
        res.send("Envie el id de registro");
    }
    else {
        try {
            const buscarMarca = await prisma.marcas.findUnique(
                {
                    where: {
                        id_marca: Number(id),
                    }
                }
            )
            res.json(buscarMarca)
        } catch (error) {
            next(error)
        }
        }
}

exports.ModificarMarca = async (req, res) => {
    
    try {
        const {id_marca} =req.query;
        const {descripcion_marca, estado} = req.body;
        const marcas = await prisma.marcas.update({
        where:
        {
            id_marca:id_marca
        },
        data: 
        {
            descripcion_marca:descripcion_marca,
            estado: estado
        }
        
        })
        res.json(marcas);
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.ProductoPorMarca = async (req, res) => {
    let {idmarca} = req.query;
        idmarca = parseInt(idmarca);
        const marca = await ModeloMarca.findMany({
            where:
            {
                id_marca: idmarca
            },
            select:{
                Productos:true
            }
        });
        res.json(marca);
}