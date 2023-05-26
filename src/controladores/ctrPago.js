const factura = require('../modelos/pago')
const usuario = require("../modelos/usuario")
const { validationResult } = require('express-validator')
const { MSJ, exito } = require('../componentes/mensaje')

exports.Inicio = (req, res) => {
    const moduloPago = {
        modulo: '/api/pagos',
        descripcion: 'Contiene Datos generados acerca del id de pago y id metodo de pago',
        rutas: [
            {
                ruta: '/api/pagos/listar',
                descripcion: 'Lista los identificadores de pago',
                metodo: 'GET',
                parametros: 'ninguno'
            }, {
                ruta: '/api/pagos/guardar',
                descripcion: 'guarda los datos de pagos',
                metodo: 'POST',
                parametros: 'ninguno'

            },
            {
                ruta: '/api/pagos/eliminar',
                descripcion: 'Elimina los datos de un pago',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }

        ]
    }
    MSJ(exito, moduloPago, res)

}

exports.listar = async (req, res) => {
    const {Id} =req.query

    if(Id){

        const buscarUsuario = await usuario.findOne({
            where: {
                id:Id
            }
        })

        if(buscarUsuario){

            
            const listarFacturas = await factura.findAll({where: {
                UsuarioId:Id
            }})
            
            MSJ(exito, listarFacturas, res)
        }else{
            MSJ(exito, "No Se Encontro El Usuario", res)

        }
    }else{
     MSJ(exito, "Debe Enviar El Id usuario", res)
    }
    

    
}


exports.guardar = async (req, res) => {
    const validacion = validationResult(req)

    if (!validacion.isEmpty()) {
        MSJ(exito, validacion, res)

    } else {

        const { pedido,total,subtotal,impuesto, IdUsuario } = req.body;

        if (!IdUsuario || !pedido||!total||!subtotal||!impuesto) {

            const er = {
                msj: 'Debe Debe enviar los datos obligatorios',
                parametros: 'pedido, total, subtotal, impuesto, IdUsuario'
            }

            MSJ(exito, er, res)

        } else {

              
            const buscarUsuario = await usuario.findOne({
                where:{ 
                   id:IdUsuario
            }})

            if(buscarUsuario){

            await factura.create({
                pedido:pedido,
                total:total,
                subtotal:subtotal,
                impuesto:impuesto,
                UsuarioId:IdUsuario
                
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
            }else{
                
                MSJ(exito, "No Se Encontro El Usuario", res)
            }
        }
    }
}

exports.eliminar = async (req, res) => {
    const { Id } = req.query;


    if (!Id) {
        res.send('Debe Escribir el Id');
    } else {
        var buscarPago = await factura.findAll({
            where: {
                UsuarioId: Id
            }
        })

        if (!buscarPago) {

            MSJ(exito, 'El Id No existe', res)

        } else {

            await factura.destroy({ 
                where:{
                    UsuarioId:Id} })
                .then((data) => {
                    MSJ(exito, 'Se Elimino el registro', res)
                })
                .catch((er) => {

                    MSJ(exito, 'Error al eliminar Registro', res)
                })
        }


    }
}
