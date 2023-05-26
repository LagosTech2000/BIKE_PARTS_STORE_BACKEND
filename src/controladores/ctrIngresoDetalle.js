const detalle = require('../modelos/ingresoDetalle')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')


exports.Inicio = (req,res)=>{
    const moduloDetalles ={
           modulo:'/api/ingresosD',
           descripcion:'Contiene informacion de los detalles de los ingresos',
           rutas:[
            { 
                ruta:'/api/ingresosD/listar',
             descripcion:'Lista los detalles de los ingresos',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/ingresosD/guardar',
                descripcion:'guarda los detalles de los ingresos',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/ingresosD/editar',
                descripcion:'Modifica los detalles de los ingresos',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/ingresosD/eliminar',
                descripcion:'Elimina los detalles de los ingresos',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloDetalles,res)
  
}

exports.listar = async(req,res)=>{
    const listaDetalles= await detalle.findAll()     
    MSJ(exito,listaDetalles,res)
}

exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const {precioCompra, precioVenta, ingresoId, articuloId } = req.body;

    if (!precioCompra||!precioVenta) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'precioCompra, precioVenta, ingresoId'
        }        
        
        MSJ(exito,er,res)

    } else {

            await  detalle.create({
                precioCompra: precioCompra,
                precioVenta: precioVenta ,
                ingresoId,
                articuloId
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

exports.editar = async (req,res)=>{    
    const {Id} = req.query;
    const { precioCompra, precioVenta, ingresoId, articuloId} = req.body;

    if(!Id){
        const er = {
            msj:'Debe escribir el Id'
        }
        MSJ(exito,er,res)
        
    }else{
        if (!precioCompra || !precioVenta) {
            const er={
                msj:'Debe Debe enviar los datos obligatorios',
                parametros:'precioCompra, precioVenta'
            }
    
        } else{

            var buscarDetalle = await detalle.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarDetalle) {                
                const er = {
                    msj:'El Id del detalle no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscarDetalle.precioCompra = precioCompra
                buscarDetalle.precioVenta = precioVenta
                buscarDetalle.ingresoId = ingresoId
                buscarDetalle.articuloId = articuloId

                await buscarDetalle.save().then((data) => { 
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


exports.eliminar = async (req,res)=>{
    const {Id} = req.query;

    
    if(!Id){
        res.send('Debe Escribir el Id');
    }else{
            var buscarDetalle= await detalle.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarDetalle) {
                
                MSJ(exito,'EL ID NO EXISTE',res)
            } else {                
                await buscarDetalle.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro ',res)
                    })
                    .catch((er) => {
                        
                        MSJ(exito,'Error al eliminar Registro',res)
                    })            
        }
}
 
}

