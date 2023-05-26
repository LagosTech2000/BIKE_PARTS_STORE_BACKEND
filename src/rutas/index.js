const { Router } = require('express');
const controladorInicio = require('../controladores/ctrInicio')
const ruta = Router();

ruta.get('/', controladorInicio.Inicio)


module.exports = ruta   