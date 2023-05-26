const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db')
const pedido = db.define(
    'pedido',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        fechaPedido: {
            type: DataTypes.DATEONLY, allowNull: false, validate: {
                isDate: true
            }
        },
        fechaEnvio: {
            type: DataTypes.DATEONLY, allowNull: false, validate: {
                isDate: true
            }
        }
    },

    {
        tablename: 'Pedidos'
    }

);
module.exports = pedido; 