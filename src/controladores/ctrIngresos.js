const ingreso = require('../modelos/ingreso')
const { validationResult } = require('express-validator')
const { MSJ, exito } = require('../componentes/mensaje')

exports.Inicio = (req, res) => {
    const moduloIngresos = {
        modulo: '/api/ingresos',
        descripcion: 'Contiene informacion de los ingresos',
        rutas: [
            {
                ruta: '/api/ingresos/listar',
                descripcion: 'Lista los ingresos',
                metodo: 'GET',
                parametros: 'ninguno'
            }, {
                ruta: '/api/ingresos/guardar',
                descripcion: 'guarda los datos de los ingresos',
                metodo: 'POST',
                parametros: 'ninguno'

            }, {

                ruta: '/api/ingresos/editar',
                descripcion: 'Modifica los datos de un ingreso',
                metodo: 'PUT',
                parametros: 'ninguno'

            }, {
                ruta: '/api/ingresos/eliminar',
                descripcion: 'Elimina los datos de un ingreso',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }

        ]
    }
    MSJ(exito, moduloIngresos, res)

}

exports.listar = async (req, res) => {
    const listaIngresos = await ingreso.findAll()
    MSJ(exito, listaIngresos, res)
}
exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const {fecha} = req.body;

    if (!fecha) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'fecha, proveedorId'
        }        
        
        MSJ(exito,er,res)

    }else{
            await  ingreso.create({
                fecha:fecha,
            })

            .then((data) => {

                MSJ(exito,data,res)
               
            }).catch((error) => {

                var lerr=''
                error.errors.map((el)=>{                    
                    lerr += (el.message+'. ')
                })
              
                res.json(lerr)
            })


            }
    }
}

exports.editar = async (req, res) => { 
        const {Id} = req.query;
        const { fecha} = req.body;
    
        if(!Id){
            const er = {
                msj:'Debe escribir el Id'
            }
            MSJ(exito,er,res)
            
        }else{
            if (!fecha) {
                const er={
                    msj:'Debe Debe enviar los datos obligatorios',
                    parametros:'fecha'
                }    
        
            } else{
    
                var buscarIngreso = await ingreso.findOne({
                    where: {
                        id: Id
                    }
                })
    
                if (!buscarIngreso) {                
                    const er = {
                        msj:'El Id del ingreso no existe'
                    }
                    MSJ(exito,er,res)
                } else {
                   
                    await buscarIngreso.save().then((data) => { 
                            console.log(data)                        
                            const er = {
                                msj:'Registro Modificado'
                            }
                            MSJ(exito,er,res)
                        })
                        .catch((er) => {                        
                            MSJ(exito,er,res)
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
        var buscarIngreso = await ingreso.findOne({
            where: {
                id: Id
            }
        })

        if (!buscarIngreso) {

            MSJ(exito, 'El Id no existe', res)
        } else {
            await buscarIngreso.destroy({ where: Id })
                .then((data) => {
                    MSJ(exito, 'Se Elimino el registro', res)
                })
                .catch((er) => {

                    MSJ(exito, 'Error al eliminar Registro', res)
                })
        }
    }

}