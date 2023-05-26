const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorAutenticacion = require('../controladores/autenticacion');
const rutas = Router();
rutas.get('/', controladorAutenticacion.Inicio);
  

rutas.post('/pin2',
query('login')
.notEmpty().withMessage('Debe escribir el usuario'),

controladorAutenticacion.PinCorreo);

rutas.put('/recuperarcontrasena', controladorAutenticacion.Recuperar);




 rutas.post('/iniciosesion', 
body('usuario').isLength({min: 3}).withMessage('Debe escribir el nombre de usuario'),
body('usuario')
.notEmpty().withMessage('Debe escribir el usuario'),
body('pass')
.notEmpty().withMessage('Debe escribir la contraseña'),
controladorAutenticacion.InicioSesion);

rutas.get('/error', controladorAutenticacion.Error);

module.exports = rutas;
