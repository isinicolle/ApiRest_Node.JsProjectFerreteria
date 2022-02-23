const {PrismaClient} = require('@prisma/client') ;
const prisma = new PrismaClient();
exports.Raiz = async(req,res) => {
    console.log("Hola soy el controlador de inicio");
    res.json((await prisma.ciudades.findFirst()));
};