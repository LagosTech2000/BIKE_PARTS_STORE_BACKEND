const { Router } = require('express');
const {body,query} = require('express-validator');
const path = require("path");
const { ValidarAutendicado } = require('../configuraciones/passport');
const passport = require('../configuraciones/passport');
const ctrUsuarios = require('../controladores/ctrUsuario')

const multer = require('multer');
const { MSJ,exito } = require('../componentes/mensaje');
const ruta = Router();


const storageUsuarios = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/usuarios')); 
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9); 
        
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/', '.')); 
    }
});

const uploadUsuarios = multer({ storage: storageUsuarios});

ruta.get('/', ctrUsuarios.Inicio)
ruta.get('/listar',ValidarAutendicado, ctrUsuarios.listar)
ruta.post('/guardar',
body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]')
,body('correo').isLength({min:1 }).withMessage('El correo no puede estar vacio').isEmail().withMessage('Ingresa Un Correo valido!'), ctrUsuarios.guardar)
ruta.put('/editar',ValidarAutendicado,body('nombre').isLength({min:3,max:50}).withMessage('El nombre del tipo no cumple con la longitud minima[3]/maxima[50]'), ctrUsuarios.editar)
ruta.delete('/eliminar',ValidarAutendicado,ctrUsuarios.eliminar)
ruta.post('/imagen', uploadUsuarios.single('img'), ctrUsuarios.recibirImagen)
ruta.get('/buscarxd',ctrUsuarios.listarSinUser)
ruta.get('/buscar',ValidarAutendicado,  ctrUsuarios.buscarNombre)
ruta.put('/recuperar', ctrUsuarios.actualizarContra)


module.exports = ruta;  