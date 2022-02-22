const sequelize = require('sequelize');

//BASE DE DATOS
const db = new sequelize(
    'ferreteria_MovilWeb', //nombre de la base de datos
    'adminUnicah', //usuario de la BD
    'rootUnicah1', //clave del usuario
    {
        host: 'andresmunicah.database.windows.net', //servidor
        dialect: 'mssql' , //dbms
        driver:'tedious',
        port: '1433', //puerto
        options: {
            encrypt:true
        }
    }

);
//exportar
module.exports=db;