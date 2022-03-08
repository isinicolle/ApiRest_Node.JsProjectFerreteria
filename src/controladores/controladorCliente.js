const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

const joi = require("@hapi/joi");
const { text } = require('express');




const validar = joi.object({
    nom_cliente: joi.string().min(2).required(),
    apellido_cliente: joi.string().min(2).required(),
    RTN: joi.string().min(2).required(),
    tel_cliente:  joi.string().min(2).required(),
    estado: joi.boolean().required(),
    DNI_Cliente: joi.string().min(2).required(),
    
    
});

const validarUpdate = joi.object({
    nom_cliente: joi.string().min(2).required(),
    apellido_cliente: joi.string().min(2).required(),
    RTN: joi.string().min(2).required(),
    direccion_cliente:  joi.string().min(2).required(),
    id_ciudad: joi.number().integer().required(),
    tel_cliente:  joi.string().min(2).required(),
    DNI_Cliente: joi.string().min(2).required(),
    
    
});

const validarEstado = joi.object({
 
    estado: joi.boolean().required(),
 
    
});

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
        res.json("Envie el id de cliente");
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

    const result = await validar.validate(req.body);
    if(result.error)
    {
        res.json("ERROR! Verifique que los datos a ingresar tienen el formato correcto");

    
        
    }
    else
    {
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
    
}

//actualizar cliente
exports.eliminarCliente= async (req,res) =>{
    const {id_cliente} =req.query;

    if(!id_cliente)
    {
        res.json("Envie el id de registro");
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
    const {id_cliente} =req.query;
    const {nom_cliente,apellido_cliente, RTN , DNI_Cliente , tel_cliente} = req.body;


    if(!id_cliente)
    {
        res.json("Envie el id del cliente");
    }
    else
    {
        const result = await validarUpdate.validate(req.body);
        if(result.error)
        {
            res.json("ERROR! Verifique que los datos a ingresar tienen el formato correcto");
    
        
            
        }
        else
        {
            try {
      
                const clientes = await prisma.clientes.update({
                where:
                {
                      id_cliente: Number(id_cliente),
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
       
    }
   
};


//actualizar estado cliente
exports.actualizarEstadoCliente= async (req,res) =>{
    const {id_cliente} =req.query;
    const {estado} = req.body;


    if(!id_cliente)
    {
        res.json("Envie el id del cliente");
    }
    else
    {
        const result = await validarEstado.validate(req.body);
        if(result.error)
        {
            res.json("ERROR! Verifique que coloco correctamente el estado");
    
        
            
        }
        else
        {
            try {
      
                const clientes = await prisma.clientes.update({
                where:
                {
                      id_cliente: Number(id_cliente),
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

