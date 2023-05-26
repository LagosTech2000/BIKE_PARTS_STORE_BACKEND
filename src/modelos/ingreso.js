const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const ingreso = db.define( 
'ingreso',    
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    fecha:{type:DataTypes.DATEONLY,primaryKey:true,allowNull:true},
},

{
tablename:'ingresos'
}

);
module.exports = ingreso; 