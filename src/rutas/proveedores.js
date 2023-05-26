const { Router } = require('express');
const {body,query} = require('express-validator')
const ctrProveedores = require('../controladores/ctrProveedor')
const {ValidarAutendicado} = require("../configuraciones/passport");
const ruta = Router();

ruta.get('/', ctrProveedores.Inicio)
ruta.get('/listar',ValidarAutendicado, ctrProveedores.listar)
ruta.post('/guardar',ValidarAutendicado,body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), ctrProveedores.guardar)
ruta.put('/editar',ValidarAutendicado,body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), ctrProveedores.editar)
ruta.delete('/eliminar',ctrProveedores.eliminar)
module.exports = ruta