const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const descarteCliente = db.define(
'cliente',
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    nombre:{type:DataTypes.STRING(50),allowNull:false},
    apellido:{type:DataTypes.STRING(50),allowNull:false},
    dni:{type:DataTypes.STRING(13),allowNull:false,unique:{arg:true, msg: 'El dni debe ser unico'}},
    direccion:{type:DataTypes.STRING(70),allowNull:true,unique:true},
    telefono:{type:DataTypes.STRING(20),allowNull:false,validate:{
        is: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,   },},
    correo:{type:DataTypes.STRING(45), allowNull: false,
        unique: { arg: true,msg: 'El correo ya se encuentra asignado'}, },     
    imagen:{type:DataTypes.STRING(255),allowNull:true,defaultValue:true},
    sexo:{type: DataTypes.ENUM('M', 'F', 'O'), allowNull: true, defaultValue: 'O'},
    fechaNac:{type:DataTypes.DATEONLY,allowNull:true},

},

{
tablename:'DescarteClientes'
}

);
module.exports = descarteCliente; 