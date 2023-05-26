const { DataTypes, DATE } = require('sequelize');
const db = require('../configuraciones/db')
const venta = db.define(
    'venta',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            }

        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Solo se admiten numeros'
                }
            }
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Solo se admiten numeros'
                }
            }

        },
        articulo: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        cantidad: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Solo se admiten numeros'
                }
            }
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        isv: {
            type:
                DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Solo se admiten numeros'
                }
            }
        },
        descuento: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Solo se admiten numeros'
                }
            }
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "Solo se admiten numeros"
                }
            }
        }
    },

    {
        tablename: 'Ventas'
    }

);
module.exports = venta; 