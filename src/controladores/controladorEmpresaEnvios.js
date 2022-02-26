const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

//listar empresaEnvios
exports.listarEmpresaEnvios = async (req,res,next) =>{
    try {
        const empresaEnvios = await prisma.empresasEnvio.findMany();
        res.json(empresaEnvios);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.insertarEmpresaEnvios = async (req,res,next) =>{
    
    try {
        const { id_empresaEnvio,nombre_empresa,direccion_empresa,telefono_empresa,id_ciudad ,estado,correo_empresa}= req.body;
        const empresaEnvios = await prisma.empresasEnvio.create({
          data:{  id_empresaEnvio:id_empresaEnvio, 
            nombre_empresa:nombre_empresa,   
            direccion_empresa:direccion_empresa,
            telefono_empresa:telefono_empresa,  
            Ciudades:{connect:{id_ciudad:id_ciudad}},   
            estado:estado ,         
            correo_empresa:correo_empresa ,
        },
        include:{Ciudades:true}
        })
        res.json(empresaEnvios);
    } catch (error) {
        console.log(error)
        next(error);
    }
}


exports.eliminarEmpresaEnvios= async (req,res) =>{
    const {id_empresaEnvio} =req.query;

    if(!id_empresaEnvio)
    {
        res.send("Envie el id de registro");
    }
    else
    {
        try {
            const eliminarEmpresaEnvios = await prisma.empresasEnvio.delete(
                {
                    where:
                    {
                        id_empresaEnvio: Number(id_empresaEnvio),
                    },
                })
                res.json(eliminarEmpresaEnvios)
        } catch (error) {
            next(error)
        }      
    }
}
