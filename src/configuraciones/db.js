const sequelize = require('sequelize')

const db = new sequelize(
  process.env.BASE_NOMBRE ,// database name
  process.env.BASE_USUARIO,// user
  process.env.BASE_PASS,// password 
  {
    host: process.env.BASE_SERVIDOR,
    dialect: 'mysql',
    port: process.env.BASE_PUERTO

  }

);
module.exports = db;