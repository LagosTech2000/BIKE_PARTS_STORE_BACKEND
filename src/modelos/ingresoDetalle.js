const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const ingresoD = db.define(
'ingresoD',    
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    precioCompra:{type:DataTypes.DOUBLE,allowNull:false, validate:{isNumeric:{ msg:'Solo se admiten numeros'}}},
    precioVenta:{type:DataTypes.DOUBLE,allowNull:false, validate:{isNumeric:{ msg:'Solo se admiten numeros'}}}
},

{
tablename:'ingresods'
}

);
module.exports = ingresoD; 