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


exports.loginUsuarioCliente = async (req,res,next) =>{
    const {nombre_usuario,contraenia_usuario} =req.body;

    if(!nombre_usuario || !contraenia_usuario)
    {
        res.send("Debe ingresar todos los datos");
    }
    else
    {
        try {
            const buscarUsuarioCliente = await prisma.usuariosClientes.findFirst(
                {
                    where:
                    {
                        nombre_usuario: nombre_usuario,
                    },//
                })//
                if(buscarUsuarioCliente!=null){
                if(contraenia_usuario==buscarUsuarioCliente.contraenia_usuario){
                    if(buscarUsuarioCliente.estado==true){
                        res.json(buscarUsuarioCliente);
                    }
                    else{
                        res.send("Este usuario esta inactivo, comunicarse con servicio al cliente")
                    }
                }
                else{
                    res.send("Usuario o contraseña incorrecto")
                }
            }
            else{
                res.send("Usuario o contraseña incorrecto")
            }
        } catch (error) {
            console.log(error);
            res.send("Ha ocurrido un error inesperado");
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

exports.actualizarCliente= async (req,res) =>{
    const {id_usuarioCliente} =req.query;
    const {nombre_usuario,contraenia_usuario,id_cliente,correo_usuario} = req.body;


    if(!id_cliente)
    {
        res.send("Envie el id del usuario del cliente");
    }
    else
    {
        try {
      
            const clientes = await prisma.usuariosClientes.update({
            where:
            {
                  id_usuarioCliente: Number(id_usuarioCliente),
            },
            data: 
            {
                nombre_usuario: nombre_usuario,
                contraenia_usuario: contraenia_usuario,
                id_cliente: id_cliente,
                correo_usuario: correo_usuario,
            }
            
            })
            res.json(clientes);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
   
}

exports.actualizarEstadoCliente= async (req,res) =>{
    const {id_usuarioCliente} =req.query;
    const {estado} = req.body;


    if(!id_usuarioCliente)
    {
        res.send("Envie el id del usuario del cliente");
    }
    else
    {
        try {
      
            const clientes = await prisma.usuariosClientes.update({
            where:
            {
                id_usuarioCliente: Number(id_usuarioCliente),
            },
            data: 
            {
                estado: estado,
            }
            
            })
            res.json(clientes);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
   
}


