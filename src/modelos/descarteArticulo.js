const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const descarteArticulo = db.define(
'descarteArticulo',
{
    id:{
        type:DataTypes.INTEGER
        ,primaryKey:true
        ,allowNull:false,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false},
    descripcion:{
        type:DataTypes.TEXT,
        allowNull:false
    },

    imagen:{
        type:DataTypes.STRING(45),
        allowNull:true
    }
    
},

{
tablename:'Descarte_Articulos'
}

);
module.exports = descarteArticulo; 