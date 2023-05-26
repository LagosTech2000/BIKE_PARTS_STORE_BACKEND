const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const comentario = db.define(
'comentario',
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    titulo:{type:DataTypes.STRING(20),allowNull:false},
    mensaje:{type:DataTypes.TEXT,allowNull:false}, 
    valoracion:{type:DataTypes.STRING(2),allowNull:false}
},

{
tablename:'Comentarios'
}

);
module.exports = comentario; 