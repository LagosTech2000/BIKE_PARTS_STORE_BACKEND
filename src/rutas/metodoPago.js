const { Router } = require('express');
const {body,query} = require('express-validator')
const ctrmetodoPago = require('../controladores/ctrmetodoPago')
const {ValidarAutendicado} = require("../configuraciones/passport");
const ruta = Router();

ruta.get('/', ctrmetodoPago.Inicio)
ruta.get('/listar', ValidarAutendicado, ctrmetodoPago.listar)
ruta.post('/guardar', ValidarAutendicado, ctrmetodoPago.guardar);
ruta.put('/editar', ValidarAutendicado, ctrmetodoPago.editar);
ruta.delete('/eliminar',ctrmetodoPago.eliminar)
module.exports = ruta