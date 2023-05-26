const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const categoria = db.define(
'categoria',
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    nombre:{type:DataTypes.STRING(50),allowNull:false},
    descripcion:{type:DataTypes.STRING(100),allowNull:false}   

},

{
tablename:'Categorias'
}

);
module.exports = categoria; 