const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const proveedor = db.define(
'proveedor',
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    nombre:{type:DataTypes.STRING(100),allowNull:false},
    dni:{type:DataTypes.STRING(13),allowNull:false,unique:{arg:true, msg: 'El dni debe ser unico'}},
    telefono:{type:DataTypes.STRING(20),allowNull:false,validate:{
        is: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,  
    },
}, 
    direccion:{type:DataTypes.STRING(70),allowNull:false},       
    sexo:{type:DataTypes.STRING(1),allowNull:true},
    correo:{type:DataTypes.STRING(45), allowNull: false,
        unique: {
            arg: true,
            msg: 'El correo ya se encuentra asignado' 
        }, 
},
},
{
tablename:'Proveedores'
}

);
module.exports = proveedor; 