const { Router } = require('express'); 
const ctrDetalleP = require('../controladores/ctrDetallePedido');
const ruta=Router();
ruta.get('/', ctrDetalleP.Inicio);
ruta.get('/listar', ctrDetalleP.listar);
ruta.post('/guardar', ctrDetalleP.guardar);
ruta.put('/editar', ctrDetalleP.editar);
ruta.delete('/eliminar', ctrDetalleP.eliminar);
module.exports = ruta;