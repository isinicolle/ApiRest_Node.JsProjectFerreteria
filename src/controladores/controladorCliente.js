const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();


exports.listarClientes = async (req,res,next) =>{
    try {
        const clientes = await prisma.clientes.findMany();
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next(error);
    }
}


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



/*
exports.actualizarCliente= async (req,res) =>{
   
  try{
    const {id_cliente} = req.params
    const actualizarCliente = await prisma.clientes.update({
  
      where: { id_cliente: Number(id_cliente) },
      data: req.body,
      include: {
          Ciudades: true,
      },
    })
    res.json(actualizarCliente)
  }
  catch(error)
  {
    next(error)
  }
}
*/
