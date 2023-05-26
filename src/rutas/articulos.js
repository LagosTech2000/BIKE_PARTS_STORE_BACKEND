const { Router } = require('express');
const path = require("path");
const multer = require('multer')
const { ValidarAutendicado } = require('../configuraciones/passport');
const ctrArticulo = require('../controladores/ctrArticulo')
const {body,query} = require('express-validator')

const storageArticulos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/articulos')); 
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9); 
        
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/', '.')); 
    }
});

const uploadArticulos = multer({ storage: storageArticulos });



const ruta = Router();

ruta.get('/', ctrArticulo.Inicio)
ruta.get('/listar',ValidarAutendicado, ctrArticulo.listar)
ruta.post('/guardar',/*ValidarAutendicado,*/body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), ctrArticulo.guardar)
ruta.put('/editar',ValidarAutendicado,body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), ctrArticulo.guardar)
ruta.delete('/eliminar',query('Id').isLength({min:1}).withMessage('Debe Ingresar el Id'),ctrArticulo.eliminar)
ruta.post('/imagen', uploadArticulos.single('img'), ctrArticulo.recibirImagen)
ruta.get('/buscar',ValidarAutendicado,ctrArticulo.buscarArticulo)
module.exports = ruta;