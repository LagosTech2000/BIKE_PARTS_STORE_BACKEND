const { Router } = require('express');
const {body,query} = require('express-validator');
const path = require("path");
const { ValidarAutendicado } = require('../configuraciones/passport');
const passport = require('../configuraciones/passport');
const ctrDescarteClientes = require('../controladores/ctrDescarteCliente')

const multer = require('multer');
const { MSJ,exito } = require('../componentes/mensaje');
const ruta = Router();


ruta.get('/', ctrDescarteClientes.Inicio)
ruta.get('/listar',ValidarAutendicado, ctrDescarteClientes.listar)
ruta.post('/guardar',body('nombre').isLength({min:3,max:50}).withMessage('El nombre del cliente no cumple con la longitud minima[3]/maxima[50]'), ctrDescarteClientes.guardar)
ruta.post('/guardar',body('apellido').isLength({min:3,max:50}).withMessage('El aplelido del cliente no cumple con la longitud minima[3]/maxima[50]'), ctrDescarteClientes.guardar)
ruta.put('/editar',body('nombre').isLength({min:3,max:50}).withMessage('El nombre del cliente no cumple con la longitud minima[3]/maxima[50]'), ctrDescarteClientes.editar)
ruta.put('/editar',body('apellido').isLength({min:3,max:50}).withMessage('El nombre del cliente no cumple con la longitud minima[3]/maxima[50]'), ctrDescarteClientes.editar)
ruta.delete('/eliminar',ctrDescarteClientes.eliminar)
ruta.delete('/eliminar',ctrDescarteClientes.eliminar)
module.exports = ruta