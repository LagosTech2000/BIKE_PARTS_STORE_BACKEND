const { Router } = require('express');
const path = require("path");
const multer = require('multer')
const { ValidarAutendicado } = require('../configuraciones/passport');
const ctrDescarteArticulo = require('../controladores/ctrDescarteArticulo')
const {body,query} = require('express-validator')

const ruta = Router();

ruta.get('/', ctrDescarteArticulo.Inicio)
ruta.get('/listar', ctrDescarteArticulo.listar)
ruta.post('/guardar',body('nombre').isLength({min:3,max:50}).withMessage('El nombre del descarte no cumple con la longitud minima[3]/maxima[50]'), ctrDescarteArticulo.guardar)
ruta.put('/editar',body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), ctrDescarteArticulo.guardar)
ruta.delete('/eliminar',query('Id').isLength({min:1}).withMessage('Debe Ingresar el Id'),ctrDescarteArticulo.eliminar)

module.exports = ruta