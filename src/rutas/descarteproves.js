const { Router } = require('express');
const {body,query} = require('express-validator');
const crtDescarteprove = require('../controladores/crtDescarteprove')
const ruta = Router();

ruta.get('/', crtDescarteprove.Inicio)
//Lista
ruta.get('/listar', crtDescarteprove.listar)
//Guarda
ruta.post('/guardar',
body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), 
body('nombre').isString().withMessage("Favor ingresar datos alfabeticos."),
body('correo').isEmail().withMessage('Debe ser un correo valido'),
body('telefono').isLength({min:8, max:8}).withMessage('El telefono debe contener 8 digitos').isNumeric('Deben ser numeros de el telefono'),
crtDescarteprove.guardar)
//Edita
ruta.put('/editar',
body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), 
body('nombre').isString().withMessage("Favor ingresar datos alfabeticos."),
body('correo').isEmail().withMessage('Debe ser un correo valido'),
body('telefono').isLength({min:8, max:8}).withMessage('El telefono debe contener 8 digitos').isNumeric('Deben ser numeros de el telefono'),
crtDescarteprove.editar)
//Elimina
ruta.delete('/eliminar',crtDescarteprove.eliminar)
module.exports = ruta