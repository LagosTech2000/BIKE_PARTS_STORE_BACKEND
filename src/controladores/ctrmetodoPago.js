const metodo = require('../modelos/metodoPago')
const { validationResult } = require('express-validator')
const { MSJ, exito } = require('../componentes/mensaje')
const metodoP = require('../modelos/metodoPago')


exports.Inicio = (req, res) => {
    const moduloMetodo = {
        modulo: '/api/metodo',
        descripcion: 'Contiene informacion del metodo de pago',
        rutas: [
            {
                ruta: '/api/metodo/listar',
                descripcion: 'Lista los metodos de pago',
                metodo: 'GET',
                parametros: 'ninguno'
            }, {
                ruta: '/api/metodo/guardar',
                descripcion: 'guarda los articulos',
                metodo: 'POST',
                parametros: 'ninguno'

            }, {

                ruta: '/api/metodo/editar',
                descripcion: 'Modifica los datos del metodo de pago',
                metodo: 'PUT',
                parametros: 'ninguno'

            }, {
                ruta: '/api/metodo/eliminar',
                descripcion: 'Elimina los datos del metodo de pago',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }

        ]
    }
    MSJ(exito, moduloMetodo, res)

}

exports.listar = async (req, res) => {
    const listaMetodo= await metodo.findAll()
    MSJ(exito, listaMetodo, res)
}

exports.guardar = async (req, res) => {
    const validacion = validationResult(req)

    if (!validacion.isEmpty()) {
        MSJ(exito, validacion, res)
    } else {
        const { metodoPago} = req.body;

        if (!metodoPago) {

            const er = {
                msj: 'Debe enviar los datos obligatorios',
                parametros: 'metodoPago'
            }

            MSJ(exito, er, res)

        } else {

                await metodo.create({
                   metodoPago: metodoPago
                })

                    .then((data) => {

                        MSJ(exito, data, res)

                    }).catch((error) => {

                        var lerr = ''
                        error.errors.map((el) => {
                            lerr += (el.message + '. ')
                        })

                        res.json(lerr)
                    })

        }
    }
}

exports.editar = async (req, res) => {
    const { Id } = req.query;
    const {metodoPago} = req.body;

    if (!Id) {
        const er = {
            msj: 'Debe escribir el Id'
        }
        MSJ(exito, er, res)

    } else {
        if (!metodoPago) {
            const er = {
                msj: 'Debe Debe enviar los datos obligatorios',
                parametros: 'metodoPago'
            }

        } else {

            var buscarMetodo = await metodo.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarMetodo) {
                const er = {
                    msj: 'El Id del metodo de pago no existe'
                }
                MSJ(exito, er, res)
            } else {
                buscarMetodo.metodoPago = metodoPago
               
                await buscarMetodo.save().then((data) => {
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
        var buscarMetodo = await metodo.findOne({
            where: {
                id: Id
            }
        })

        if (!buscarMetodo) {

            MSJ(exito, 'EL ID NO EXISTE', res)
        } else {
            await buscarMetodo.destroy({ where: Id })
                .then((data) => {
                    MSJ(exito, 'Se Elimino el registro ', res)
                })
                .catch((er) => {

                    MSJ(exito, 'Error al eliminar Registro', res)
                })
        }


    }

}
