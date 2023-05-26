const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const metodoP = db.define(
'metodoPago',    
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true}, 
    metodoPago: { type: DataTypes.STRING(15), allowNull: false, defaultValue: 'EFECTIVO', validate:{isIn: [['EFECTIVO', 'TARJETA']]}},
},

{ 
tablename:'metodoPago'
}
); 
module.exports = metodoP; 