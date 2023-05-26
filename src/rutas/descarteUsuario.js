const { Router } = require('express');
const {body,query} = require('express-validator');
const path = require("path");
const { ValidarAutendicado } = require('../configuraciones/passport');
const passport = require('../configuraciones/passport');
const ctrDescarteUsuarios = require('../controladores/ctrDescarteUsuario')

const multer = require('multer');
const { MSJ,exito } = require('../componentes/mensaje');
const ruta = Router();


ruta.get('/', ctrDescarteUsuarios.Inicio)
ruta.get('/listar',ValidarAutendicado, ctrDescarteUsuarios.listar)
ruta.post('/guardar',ValidarAutendicado,body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), ctrDescarteUsuarios.guardar)
ruta.put('/editar',ValidarAutendicado,body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), ctrDescarteUsuarios.editar)
ruta.delete('/eliminar',ValidarAutendicado,ctrDescarteUsuarios.eliminar)
ruta.get('/buscar',  ctrDescarteUsuarios.buscarNombre)
module.exports = ruta;