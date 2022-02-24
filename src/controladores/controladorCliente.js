const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();

exports.Raiz = async(req,res) => {
    console.log("Hola soy el controlador de inicio");
    res.json((await prisma.clientes.findFirst()));
};

exports.listarClientes = async (req,res,next) =>{
    try {
        const clientes = await prisma.clientes.findMany();
        res.json(clientes);
    } catch (error) {
        console.log(error)
        next(error);
    }
}