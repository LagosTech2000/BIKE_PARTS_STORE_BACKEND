const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db')
const VentasDetalle = db.define(
    'VentasDetalle',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        cantidad: {

            type: DataTypes.INTEGER,
            allowNull: false
        },

        total: {

            type: DataTypes.INTEGER,
            allowNull: false
        }

    },

    {
        tablename: 'VentasDetalles'
    }

);
module.exports = VentasDetalle; 