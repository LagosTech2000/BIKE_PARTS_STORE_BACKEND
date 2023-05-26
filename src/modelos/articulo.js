const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const articulo = db.define(
'articulo',
{
    id:{
        type:DataTypes.INTEGER
        ,primaryKey:true
        ,allowNull:false,
        autoIncrement:true
    },
    codigo:{

        type:DataTypes.STRING(15),allowNull:false
    
    },
    nombre:{


        type:DataTypes.STRING(50),
        allowNull:false},

    descripcion:{

        type:DataTypes.TEXT,
        allowNull:false
    },
    
    imagen:{

        type:DataTypes.STRING(255),
        allowNull:true
    
    },
    
    precio:{
        type:DataTypes.DOUBLE,
        allowNull:false
    }

},

{
tablename:'Articulos'
}

);
module.exports = articulo; 