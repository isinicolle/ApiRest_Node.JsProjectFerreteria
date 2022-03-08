const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

const bcrypt = require ('bcrypt');
const emailer = require('../configuraciones/emailer');
const passport = require('../configuraciones/passport');
const ModeloUsuario = prisma.usuariosClientes;
const msj = require('../configuraciones/mensaje');
const joi = require("@hapi/joi");
const { text } = require('express');

const validar = joi.object({
    nombre_usuario: joi.string().min(2).required(),
    contraenia_usuario: joi.string().min(6).required(),
    id_cliente: joi.number().integer().required(),
    correo_usuario: joi.string().min(2).required(),
});
const validarEstado = joi.object({
    estado: joi.boolean().required(),

});

const validarClave = joi.object({
    contraenia_usuario: joi.string().min(6).required(),

});

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

exports.ValidarAutenticado = passport.ValidarAutenticado;

exports.loginUsuarioCliente = async (req,res,next) =>{
    const {correo_usuario,contraenia_usuario} =req.body;

    if(!correo_usuario || !contraenia_usuario)
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
                        correo_usuario: correo_usuario,
                    },//
                })//
                if(buscarUsuarioCliente!=null){
                if(contraenia_usuario==buscarUsuarioCliente.contraenia_usuario){
                    if(buscarUsuarioCliente.estado==true){

                        const token = passport.generarToken({correo_usuario: buscarUsuarioCliente.correo_usuario});
                        console.log(token);

                        const data = {
                            token: token,
                            data: buscarUsuarioCliente
                        };
                        msj("Bienvenido", 200, data, res);
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
};

exports.Error = (req, res) => {
    msj("Debe estar autenticado", 200, [], res);
};

exports.insertarUsuariocliente = async (req,res,next) =>{

    const {nombre_usuario,contraenia_usuario,id_cliente,correo_usuario} = req.body;


    try {
      /*  const clientes = await prisma.usuariosClientes.create({
            data: req.body,
        })
        res.json(clientes);
*/
        const result = await validar.validate(req.body);
        if(result.error)
        {
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");

        
            
        }
       /* if(!nombre_usuario || !contraenia_usuario || !id_cliente || !correo_usuario)
        {
            res.send('No mandar datos vacios');
        }*/
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
                id_cliente: Number(7),
                correo_usuario: correo_usuario,
                estado : true,
            }
                })
       
                console.log({contraenia_usuario,passwordHash});
        
                emailer.sendMail(clientes.correo_usuario);
                res.json("Registro logrado con exito");
            //
            }
         
        }
   
       
    } catch (error) {
        console.log(error)
        next(error);
    }
}


//eliminar usuario del cliente
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
        const result = await validar.validate(req.body);
        if(result.error)
        {
            res.send("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
    
        
            
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
   
   
}

exports.actualizarEstadoCliente= async (req,res) =>{
    const {id_usuarioCliente} =req.query;
    const {estado} = req.body;


    if(!id_usuarioCliente)
    {
        res.send("Debe enviar el id del usuario");
    }
    else
    {

        const result = await validarEstado.validate(req.body);
        if(result.error)
        {
            res.send("ENVIE UN DATO TRUE/FALSE PARA EL ESTADO");
    
        
            
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
   
}



exports.recuperarContrasena = async (req, res, next)=>
{   
    
    const {correo_usuario} =req.query;
    var {contraenia_usuario} = req.body;


    if(!correo_usuario)
    {
        res.send("Envie el correo usuario del cliente");
    }
    else
    {

        contraenia_usuario = (Math.floor(Math.random() * (99999 - 11111)) + 11111).toString();
        const passwordHash = await bcrypt.hash(contraenia_usuario,12)
      
        try {
            
            var buscarUser = await prisma.usuariosClientes.findFirst({
             where:
            {
                correo_usuario: correo_usuario,
            },
            })
            
           
            const clientes = await prisma.usuariosClientes.update({
                where:
                {
                      id_usuarioCliente: Number(buscarUser.id_usuarioCliente),
                },
                data: 
                {
                    contraenia_usuario: passwordHash,
                }
                

            })



            emailer.sendMailPassword(clientes.correo_usuario,contraenia_usuario);
            res.json("Correo: "+clientes.correo_usuario+" Clave nueva: "+contraenia_usuario+" Ingrese nuevamente para cambiar su clave");



        } catch (error) {
            console.log(error)
            next(error)
        }
    }
   
};

exports.actualizarClave= async (req,res) =>{
    const {id_usuarioCliente} = req.query;
    const {contraenia_usuario} = req.body;


    if(!id_usuarioCliente)
    {
        res.send("Envie el id del usuario del cliente");
    }
    else
    {
        const result = await validarClave.validate(req.body);

        if(result.error){
            res.send("ERROR! Verifique que su clave tenga mas de 6 digitos");
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
            
                    contraenia_usuario: passwordHash,
       
                }
                
                })
                
                res.json(clientes);
            } catch (error) {
                console.log(error)
                next(error)
            }
        }
      
    }
   
   
}