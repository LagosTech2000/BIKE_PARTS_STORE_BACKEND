const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');
const descarteUsuario = db.define(
    'descarteUsuario',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        login: {
            type: DataTypes.STRING(50), allowNull: false,
            unique: {
                arg: true,
                msg: 'El login ya se encuentra asignado'
            },
            validate: {
                len: [3, 50],
            },
        },
        nombre:{
            type:DataTypes.STRING(50),
            allowNull:false},
        clave: { type: DataTypes.STRING(250), allowNull: false, },
        correo: {
            type: DataTypes.STRING(50), allowNull: false,
            unique: {
                arg: true,
                msg: 'El correo ya se encuentra asignado'
            },
            validate: {
                isEmail: true,
            },
        },
        imagen:{
            type: DataTypes.STRING(255),allowNull: true,
        },
        direccion:{type:DataTypes.STRING(70),allowNull:true},
        dni:{type:DataTypes.STRING(100),allowNull:false,unique:true},
        sexo:{type:DataTypes.STRING(1), allowNull: true, },
        fechaNac:{type:DataTypes.DATEONLY, allowNull: true, },
        telefono:{type:DataTypes.STRING(20),allowNull:true},
        codigo: { type: DataTypes.STRING(10), allowNull: true, defaultValue: '0000' },
        fallido: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        estado: { type: DataTypes.ENUM('AC', 'IN', 'BL'), allowNull: true, defaultValue: 'AC' },
    },
    {
        tableName: 'descarteUsuarios'
    }
);


module.exports = descarteUsuario;