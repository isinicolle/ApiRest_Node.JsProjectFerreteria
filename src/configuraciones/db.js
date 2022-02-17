const sequelize = require('sequelize');

//BASE DE DATOS
const db = new sequelize(
    'base', //nombre de la base de datos
    'user', //usuario de la BD
    'clave', //clave del usuario
    {
        host: 'localhost', //servidor
        dialect: 'mysql' , //dbms
        port: '3306', //puerto
    }

);
//exportar
module.exports=db;