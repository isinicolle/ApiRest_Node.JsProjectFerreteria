const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();


exports.listarUsuarioCliente = async (req,res,next) =>{
    try {
        const usuariocliente = await prisma.usuariosClientes.findMany();
        res.json(usuariocliente);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.buscarUsuarioCliente = async (req,res,next) =>{
    const {id_usuarioCliente} =req.query;

    if(!id_usuarioCliente)
    {
        res.send("Envie el id de cliente");
    }
    else
    {
        try {
            const buscarUsuarioCliente = await prisma.usuariosClientes.findUnique(
                {
                    where:
                    {
                        id_usuarioCliente: Number(id_usuarioCliente),
                    },//
                })//
                res.json(buscarUsuarioCliente)
        } catch (error) {
            next(error)
        }
       
           
    }
}

exports.insertarUsuariocliente = async (req,res,next) =>{
    try {
        const clientes = await prisma.usuariosClientes.create({
            data: req.body,
        })
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.eliminarUsuariocliente= async (req,res) =>{
    const {id_usuarioCliente} =req.query;

    if(!id_usuarioCliente)
    {
        res.send("Envie el id de registro");
    }
    else
    {
        try {
            const eliminarUsuariocliente = await prisma.usuariosClientes.delete(
                {
                    where:
                    {
                        id_usuarioCliente: Number(id_usuarioCliente),
                    },//
                })//
               
                res.json(eliminarUsuariocliente)
        } catch (error) {
            next(error)
        }
       
           
    }
}

/*exports.modificarEstadoCliente = async(req,res) => {
    const {id_usuarioCliente} =req.query;
    const {estado} = req.body;

    if(!id_usuarioCliente || !estado)
    {
        res.send("Envie datos completos");
    }
    else
    {
        try {
            const buscarUser = await prisma.usuariosClientes.update({
                where:
                {
                    id_usuarioCliente: Number(id_usuarioCliente),
                },
            })
        }
        catch(error)
        {
            next(error)
        }
    }

}*/