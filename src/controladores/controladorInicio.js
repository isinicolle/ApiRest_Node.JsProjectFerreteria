const db = require('../configuraciones/db')
exports.Raiz = async(req,res) => {
    console.log("Hola soy el controlador de inicio");
    res.send("Hola soy el controlador de inicio");
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};