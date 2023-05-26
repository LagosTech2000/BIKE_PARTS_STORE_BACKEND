const venta = require('../modelos/venta');

const { validationResult } = require('express-validator');
const { MSJ, exito } = require('../componentes/mensaje');

exports.Inicio = (req, res) => {
    const moduloVetenta = {
        modulo: '/api/ventas',
        descripcion: 'Contiene los datos generales acerca de las ventas',
        rutas: [
            {
                ruta: '/api/ventas/listar',
                descripcion: 'Lista todas las ventas',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/ventas/guardar',
                descripcion: 'guarda los datos de la venta',
                metodo: 'POST',
                parametros: 'ninguno'

            },
            {
                ruta: '/api/ventas/editar',
                descripcion: 'Se encarga de editar los datos de la venta',
                metodo: 'PUT',
                parametros: 'ninguno'

            },
            {
                ruta: '/api/pagos/eliminar',
                descripcion: 'Elimina los datos de una venta',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }

        ]
    }
    MSJ(exito, moduloVetenta, res)

}

exports.listar = async (req, res) => {
    const listarVentas = await venta.findAll()
    MSJ(exito, listarVentas, res)
}

exports.guardar = async (req, res) => {
    const validacion = validationResult(req)

    if (!validacion.isEmpty()) {
        MSJ(exito, validacion, res)
    } else {
        const { fecha, subtotal, total, articulo, cantidad, descripcion, isv, descuento, precio, idEmpleado, idCliente } = req.body;

        if (!fecha || !subtotal || !total || !articulo || !cantidad || !descripcion || !isv || !descuento || !precio) {

            const er = {
                msj: 'Debe Debe enviar los datos obligatorios',
                parametros: 'fecha, subtotal, total, articulo, cantidad, descripcion, isv , descuento, precio, idEmpleado, idCliente'
            }

            MSJ(exito, er, res)

        } else {

            await venta.create({
                fecha: fecha,
                subtotal: subtotal,
                total: total,
                articulo: articulo,
                cantidad: cantidad,
                descripcion: descripcion,
                isv: isv,
                descuento: descuento,
                precio: precio,
                //ESCRITOS PARA SABER QUE TIENEN QUE IR 
                idEmpleado: idEmpleado,
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
    const {fecha, subtotal, total, articulo, cantidad, descripcion, isv, descuento, precio, idEmpleado, idCliente } = req.body;

    if (!Id) {
        const er = {
            msj: 'Debe escribir el Id'
        }
        MSJ(exito, er, res)

    } else {
        if (!fecha || !subtotal || !total || !articulo || !cantidad || !descripcion || !isv || !descuento || !precio) {
            const er = {
                msj: 'Debe Debe enviar los datos obligatorios',
                parametros: 'fecha, subtotal, total, articulo, cantidad, descripcion, isv, descuento, precio, idEmpleado, idCliente'
            }

        } else {

            var buscarVenta = await venta.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarVenta) {
                const er = {
                    msj: 'El Id de la venta no existe'
                }
                MSJ(exito, er, res)
            } else {
                buscarVenta.fecha = fecha
                buscarVenta.subtotal = subtotal
                buscarVenta.total = total
                buscarVenta.articulo = articulo
                buscarVenta.cantidad = cantidad
                buscarVenta.descripcion = descripcion
                buscarVenta.isv = isv
                buscarVenta.descuento = descuento
                buscarVenta.precio = precio
                
                await buscarVenta.save().then((data) => {
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
        var buscarVenta = await venta.findOne({
            where: {
                id: Id
            }
        })

        if (!buscarVenta) {

            MSJ(exito, 'El Id No existe', res)
        } else {
            
            /* const bventas = await venta.findAll()
             

            await tabladescarte.create({
                    
                    nombre:bventas.nombre
            }) */

            await buscarVenta.destroy({ where: Id })
                .then((data) => {
                    MSJ(exito, 'Se Elimino el registro', res)
                })
                .catch((er) => {

                    MSJ(exito, 'Error al eliminar Registro', res)
                })
        }


    }
}
