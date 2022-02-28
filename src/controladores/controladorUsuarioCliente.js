const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

const bcrypt = require ('bcrypt');





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

    const {nombre_usuario,contraenia_usuario,id_cliente,correo_usuario} = req.body;


    try {
      /*  const clientes = await prisma.usuariosClientes.create({
            data: req.body,
        })
        res.json(clientes);
*/

        if(!nombre_usuario || !contraenia_usuario || !id_cliente || !correo_usuario)
        {
            res.send('No mandar datos vacios');
        }
        else
        {
            if(contraenia_usuario.length < 6)
            {
                res.send('La clave debe ser menor a 6 caracteres');
            } 
            else
            {
               

            const passwordHash = await bcrypt.hash(contraenia_usuario,12)

            const clientes = await prisma.usuariosClientes.create({
            data: 
            {
                nombre_usuario: nombre_usuario,
                contraenia_usuario: passwordHash,
                id_cliente: id_cliente,
                correo_usuario: correo_usuario,
                estado : true,
            }
                })
       
                console.log({contraenia_usuario,passwordHash});
        
    
                res.json("Registro logrado con exito");
            
            //
            }
         
        }
   
       
    } catch (error) {
        console.log(error)
        next(error);
    }
}



//elimianr usuario del cliente
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


    if(!id_usuarioCliente)
    {
        res.send("Envie el id del usuario del cliente");
    }
    else
    {
        try {
            const passwordHash = await bcrypt.hash(contraenia_usuario,12)
            const clientes = await prisma.usuariosClientes.update({
            where:
            {
                  id_usuarioCliente: Number(id_usuarioCliente),
            },
            data: 
            {
                nombre_usuario: nombre_usuario,
                contraenia_usuario: passwordHash,
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

