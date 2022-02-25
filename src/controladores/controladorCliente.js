const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();


//listar cliente
exports.listarClientes = async (req,res,next) =>{
    try {
        const clientes = await prisma.clientes.findMany();
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

//buscar cliente
exports.buscarCliente = async (req,res,next) =>{
    const {id_cliente} =req.query;

    if(!id_cliente)
    {
        res.send("Envie el id de cliente");
    }
    else
    {
        try {
            const buscarCliente = await prisma.clientes.findUnique(
                {
                    where:
                    {
                        id_cliente: Number(id_cliente),
                    },//
                })//
                res.json(buscarCliente)
        } catch (error) {
            next(error)
        }
       
           
    }
}

//insertar cliente
exports.insertarcliente = async (req,res,next) =>{
    try {
        const clientes = await prisma.clientes.create({
            data: req.body,
        })
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

//actualizar cliente
exports.eliminarCliente= async (req,res) =>{
    const {id_cliente} =req.query;

    if(!id_cliente)
    {
        res.send("Envie el id de registro");
    }
    else
    {
        try {
            const eliminarCliente = await prisma.clientes.delete(
                {
                    where:
                    {
                        id_cliente: Number(id_cliente),
                    },//
                })//
                res.json(eliminarCliente)
        } catch (error) {
            next(error)
        }
       
           
    }
}




exports.actualizarCliente= async (req,res) =>{
   
    
    try {
        const {id_cliente} =req.query;
        const {nom_cliente,apellido_cliente, RTN , DNI_Cliente , tel_cliente} = req.body;
        const clientes = await prisma.clientes.update({
        where:
        {
              id_cliente: 7,
        },
        data: 
        {
            nom_cliente: nom_cliente,
            apellido_cliente: apellido_cliente,
            RTN: RTN,
            DNI_Cliente: DNI_Cliente,
            tel_cliente: tel_cliente,
        }
        
        })
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next(error)
    }
}

