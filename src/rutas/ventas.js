const { Router } = require('express');
const {body, query} = require('express-validator');
const ctrVenta = require('../controladores/ctrVenta');
const ruta = Router();
const {ValidarAutendicado} = require("../configuraciones/passport");

ruta.get('/', ctrVenta.Inicio);
ruta.get('/listar', ValidarAutendicado,ctrVenta.listar);
ruta.post('/guardar',/*ValidarAutendicado,*/ body('articulo').isLength({min:3, max:45}).withMessage('El nombre del articulo no cumple con la longitud min[3] y max[45]'),
body('descripcion').isLength({min: 3, max: 350}).withMessage('La descripcion del articulo no cumple con longitud min[3] o max[350]'),
ctrVenta.guardar);
ruta.put('/editar',ValidarAutendicado, body('articulo').isLength({min:3, max:45}).withMessage('El nombre del articulo no cumple con la longitud min[3] y max[45]'),
body('descripcion').isLength({min: 3, max: 350}).withMessage('La descripcion del articulo no cumple con longitud min[3] o max[350]'), ctrVenta.editar);
ruta.delete('/eliminar',ctrVenta.eliminar);

module.exports = ruta;