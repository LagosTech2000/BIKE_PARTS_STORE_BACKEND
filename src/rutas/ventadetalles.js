const { Router } = require('express');
const {body,query} = require('express-validator');
const ctrVentadetalle = require('../controladores/ctrVentadetalle')
const ruta = Router();

ruta.get('/', ctrVentadetalle.Inicio)
//Listas detalle de venta
ruta.get('/listar', ctrVentadetalle.listar)
//guardar detalle de venta
ruta.post('/guardar',
body('cantidad').isFloat().withMessage("Favor ingresar datos numericos."),
body("total").isFloat().withMessage("Favor ingresar datos numericos."), ctrVentadetalle.guardar)
//Edita detalle de venta
ruta.put('/editar',
body('cantidad').isFloat().withMessage("Favor ingresar datos numericos."),
body("total").isFloat().withMessage("Favor ingresar datos numericos."), ctrVentadetalle.editar)
//Elimina detalle de venta
ruta.delete('/eliminar',ctrVentadetalle.eliminar)
module.exports = ruta
