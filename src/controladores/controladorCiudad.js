const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
const ModeloCiudad = prisma.ciudades;

exports.listarCiudad = async(req, res)=>{
    const listarCiudad = await ModeloCiudad.findAll();
    if(listarCiudad.length == 0){
        res.send("No existen datos");
    }else{
        res.json(listarCiudad);
    }
}

exports.guardarCiudad = async (req, res) => {
    try {
        const Ciudad = await prisma.ciudades.create({
            data: req.body,
        })
        res.json(Ciudad);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

exports.eliminarCiudad = async (req, res) => {
    const {id} = req.query;
    if(!id) {
        res.send("Envie el id de registro");
    }
    else {
        try {
            const eliminarCiudad = await prisma.ciudades.delete(
                {
                    where: {
                        id_ciudad: Number(id),
                    }
                }
            )
            res.json(eliminarCiudad)
        } catch (error) {
            next(error)
        }
        }
}

exports.buscarCiudad = async (req, res) => {
    const {id} = req.query;
    if(!id) {
        res.send("Envie el id de registro");
    }
    else {
        try {
            const buscarCiudad = await prisma.ciudades.findUnique(
                {
                    where: {
                        id_ciudad: Number(id),
                    }
                }
            )
            res.json(buscarCiudad)
        } catch (error) {
            next(error)
        }
        }
}
exports.listarCiudadesxDepartamento= async(req,res)=>{
  
    let {idDepartamento} = req.query;
    if (!idDepartamento){
      res.send({"Error":"No hay id"})
    }
    else {
  
      idDepartamento = Number(idDepartamento);
        const buscarCiudades = await ModeloCiudad.findMany({
          where:{id_departamento:idDepartamento},
        });
        if (!buscarCiudades)
        msg("No se encontro ciudad",200,buscarCiudades,res);
        else
        
          res.send(buscarCiudades);  
    }
      
  }

exports.ModificarCiudad = async (req, res) => {
    
    try {
        const {id_ciudad} =req.query;
        const {descripcion_ciudad, estado, codigoPostal, id_departamento} = req.body;
        const ciudad = await prisma.ciudades.update({
        where:
        {
            id_ciudad:id_ciudad
        },
        data: 
        {
            nombre_ciudad: descripcion_ciudad,
            estado: estado,
            codigoPostal:codigoPostal,
            id_departamento: id_departamento,
        }
        
        })
        res.json(ciudad);
    } catch (error) {
        console.log(error)
        next(error)
    }
}