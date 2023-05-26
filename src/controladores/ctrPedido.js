const pedido = require('../modelos/pedido');
const { validationResult } = require('express-validator');
const { MSJ, exito } = require('../componentes/mensaje');

exports.Inicio = (req, res) => {
    const moduloPedido = {
        modulo: '/api/pedidos',
        descripcion: 'Contiene Datos generados de pedido del cliente',
        rutas: [
            {
                ruta: '/api/pedidos/listar',
                descripcion: 'Lista los pedidos',
                metodo: 'GET',
                parametros: 'ninguno'
            }, 
            {
                ruta: '/api/pedidos/guardar',
                descripcion: 'guarda los datos de un pedido',
                metodo: 'POST',
                parametros: 'ninguno'

            },
            {
                ruta: '/api/pedidos/editar',
                descripcion: 'Se encarga de editar los datos de un pedido',
                metodo: 'POST',
                parametros: 'ninguno'

            },
            {
                ruta: '/api/pedidos/eliminar',
                descripcion: 'Elimina los datos de un pedido',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    }
    MSJ(exito, moduloPedido, res)

}

exports.listar = async (req, res) => {
    const listarPedidos = await pedido.findAll();
    MSJ(exito, listarPedidos, res);
}

exports.guardar = async (req, res) => {
    const validacion = validationResult(req)

    if (!validacion.isEmpty()) {
        MSJ(exito, validacion, res)
    } else {
        const { fechaEnvio, fechaPedido, idCliente } = req.body;

        if (!fechaEnvio || !fechaPedido) {

            const er = {
                msj: 'Debe Debe enviar los datos obligatorios',
                parametros: 'fechaEnvio, fechaPedido'
            }

            MSJ(exito, er, res)

        } else {

            await pedido.create({
                fechaPedido: fechaPedido,
                fechaEnvio: fechaEnvio,
                idCliente: idCliente
            })
                .then((data) => {

                    MSJ(exito, data, res)

                }).catch((error) => {

                    var lerr = ''
                    error.errors.map((el) => {
                        lerr += (el.message + '. ')
                    })

                    MSJ(exito, lerr, res)
                })
        }
    }
}

exports.editar = async (req, res) => {
    const { Id } = req.query;
    const { fechaPedido, fechaEnvio } = req.body;

    if (!Id) {
        const er = {
            msj: 'Debe escribir el Id'
        }
        MSJ(exito, er, res)

    } else {
        if (!fechaPedido || !fechaPedido) {
            const er = {
                msj: 'Debe Debe enviar los datos obligatorios',
                parametros: 'fechaEnvio, fechaPedido'
            }

        } else {

            var buscarPedido = await pedido.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarPedido) {
                const er = {
                    msj: 'El Id del pedido no existe'
                }
                MSJ(exito, er, res)
            } else {
                buscarPedido.fechaEnvio = fechaEnvio
                buscarPedido.fechaPedido = fechaPedido

                await buscarPedido.save().then((data) => {
                    console.log(data)
                    const er = {
                        msj: 'Registro Modificado'
                    }
                    MSJ(exito, er, res)
                })
                    .catch((er) => {
                        MSJ(exito, er, res)
                    })
            }
        }
    }
}

exports.eliminar = async (req, res) => {
    const { Id } = req.query;


    if (!Id) {
        res.send('Debe Escribir el Id');
    } else {
        var buscarPedido = await pedido.findOne({
            where: {
                id: Id
            }
        })

        if (!buscarPedido) {

            MSJ(exito, 'El Id No existe', res)
        } else {
            await buscarPedido.destroy({ where: Id })
                .then((data) => {
                    MSJ(exito, 'Se Elimino el registro', res)
                })
                .catch((er) => {

                    MSJ(exito, 'Error al eliminar Registro', res)
                })
        }
    }
}
