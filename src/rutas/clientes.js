const { Router } = require('express');
const {body,query} = require('express-validator');
const path = require("path");
const { ValidarAutendicado } = require('../configuraciones/passport');
const passport = require('../configuraciones/passport');
const ctrClientes = require('../controladores/ctrCliente')

const multer = require('multer');
const { MSJ,exito } = require('../componentes/mensaje');
const ruta = Router();

const storageClientes = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/Clientes')); 
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9); 
        
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/', '.')); 
    }
});

const uploadClientes = multer({ storage: storageClientes});


ruta.get('/', ctrClientes.Inicio)
ruta.get('/listar', ctrClientes.listar)
ruta.post('/guardar',body('apellido').isLength({min:3,max:50}).withMessage('El nombre del cliente no cumple con la longitud minima[3]/maxima[50]'),body('nombre').isLength({min:3,max:50}).withMessage('El nombre del cliente no cumple con la longitud minima[3]/maxima[50]'), ctrClientes.guardar)
ruta.put('/editar'
,body('apellido').isLength({min:3,max:50}).withMessage('El nombre del cliente no cumple con la longitud minima[3]/maxima[50]'),body('nombre').isLength({min:3,max:50}).withMessage('El nombre del cliente no cumple con la longitud minima[3]/maxima[50]'), ctrClientes.editar)
ruta.delete('/eliminar',ctrClientes.eliminar)
ruta.post('/imagen', uploadClientes.single('img'),ctrClientes.recibirImagen)
module.exports = ruta

