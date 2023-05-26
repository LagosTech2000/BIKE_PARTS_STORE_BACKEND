const { Router } = require('express');
const path = require("path");
const multer = require('multer')
const { ValidarAutendicado } = require('../configuraciones/passport');
const ctrComentario = require('../controladores/ctrComentario')
const {body,query} = require('express-validator')



const ruta = Router();

ruta.get('/', ctrComentario.Inicio)
ruta.get('/listar',ctrComentario.listar)
ruta.post('/guardar',/*ValidarAutendicado,*/
body('titulo').isLength({min:3,max:50}).withMessage('El titulo no cumple con la longitud minima[3]/maxima[50]'),    
body('mensaje').isLength({min:3,max:350}).withMessage('El mensaje no cumple con la longitud minima[3]/maxima[50]'), ctrComentario.guardar)
ruta.put('/editar',ValidarAutendicado,body('titulo').isLength({min:3,max:50}).withMessage('El titulo no cumple con la longitud minima[3]/maxima[50]'), ctrComentario.guardar)
ruta.delete('/eliminar',query('Id').isLength({min:1}).withMessage('Debe Ingresar el Id'),ctrComentario.eliminar)
ruta.get('/buscar',ValidarAutendicado,ctrComentario.buscarComentario)
module.exports = ruta;