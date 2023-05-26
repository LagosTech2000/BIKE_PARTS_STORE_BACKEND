const { Router } = require('express');
const ctrPago = require('../controladores/ctrPago');
const ruta = Router();
const {ValidarAutendicado} = require("../configuraciones/passport");

ruta.get('/', ctrPago.Inicio);
ruta.get('/listar', ctrPago.listar);
ruta.post('/guardar',ValidarAutendicado, ctrPago.guardar);
ruta.delete('/eliminar',ValidarAutendicado,ctrPago.eliminar);

module.exports = ruta;