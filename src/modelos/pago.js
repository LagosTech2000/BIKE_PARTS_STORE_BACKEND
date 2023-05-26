const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const factura = db.define(
'factura',    
{

    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    pedido:{type:DataTypes.TEXT,allowNull:false},
    impuesto:{type:DataTypes.FLOAT,allowNull:false},
    subtotal:{type:DataTypes.FLOAT,allowNull:false},
    total:{type:DataTypes.FLOAT,allowNull:false}
}
,

{
tablename:'Facturas'
}

);
module.exports = factura