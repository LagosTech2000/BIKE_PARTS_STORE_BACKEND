const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const detallePed = db.define(
'detallePed',    
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    cantidad:{type:DataTypes.INTEGER,allowNull:false, validate:{isNumeric:{ msg:'Solo se admiten numeros'}}},
},

{
tablename:'detallePedido'
}

);
module.exports = detallePed; 