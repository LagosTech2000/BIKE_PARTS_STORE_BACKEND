const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const descarteprove = db.define(
'descarteprove',
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    nombre:{type:DataTypes.STRING(45),allowNull:false},
    telefono:{type:DataTypes.STRING(20),allowNull:true},
    direccion:{type:DataTypes.STRING(250),allowNull:true},
    correo: {
        type: DataTypes.STRING(45), allowNull: false,
        unique: {
            arg: true,
            msg: 'El correo ya se encuentra asignado'
        },
        validate: {
            isEmail: true,
        },
    }

},

{
tablename:'descarteproves'
}

);
module.exports = descarteprove; 