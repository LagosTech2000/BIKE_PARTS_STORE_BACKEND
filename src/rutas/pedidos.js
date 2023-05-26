const { Router } = require('express');
const ctrPedido = require('../controladores/ctrPedido');
const ruta = Router();
const {ValidarAutendicado} = require("../configuraciones/passport");

ruta.get('/', ctrPedido.Inicio);
ruta.get('/listar', ValidarAutendicado, ctrPedido.listar);
ruta.post('/guardar', ValidarAutendicado, ctrPedido.guardar);
ruta.put('/editar', ValidarAutendicado, ctrPedido.editar);
ruta.delete('/eliminar',ctrPedido.eliminar);

module.exports = ruta;