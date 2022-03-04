const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const productos= db.define(
    "productos",
    {
        id_producto:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false,
        },
        descripcion_producto:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        id_marca:{
            type: sequelize.INTEGER,
        },
        id_categoria:{
            type: sequelize.INTEGER
        },
        id_proveedor:{
            type: sequelize.INTEGER
        },
        cantidad_por_unidad:{
            type: sequelize.STRING(50)
        },
        costo_producto:{
            type: sequelize.FLOAT
        },
        precio_actual:{
            type: sequelize.FLOAT
        },
        stock:{
            type: sequelize.FLOAT
        },
        descuento:{
            type: sequelize.FLOAT
        },
        estado:{
            type: sequelize.BOOLEAN
        },
        imagen:{
            type: sequelize.STRING(250),
            allowNull: true,
        }
        
    },
    {
        tableName: "Productos",
        timestamps: false,
    }
);

module.exports= productos;
