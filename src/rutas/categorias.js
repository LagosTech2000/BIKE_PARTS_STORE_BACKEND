const { Router } = require('express');
const {body,query} = require('express-validator');
const ctrUCategoria = require('../controladores/ctrCategoria')
const {ValidarAutendicado} = require("../configuraciones/passport");
const ruta = Router();


ruta.get('/', ctrUCategoria.Inicio)
ruta.get('/listar', ValidarAutendicado, ctrUCategoria.listar)
ruta.post('/guardar', ValidarAutendicado
,body('descripcion').isLength({min:3,max:100}).withMessage('La descripcion del tipo no cumple con la longitud minima[3]/maxima[100]')
,body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), ctrUCategoria.guardar)
ruta.put('/editar', ValidarAutendicado,body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]')
,body('descripcion').isLength({min:3,max:100}).withMessage('La descripcion del tipo no cumple con la longitud minima[3]/maxima[100]'))
ruta.delete('/eliminar', ValidarAutendicado,ctrUCategoria.eliminar)
module.exports = ruta