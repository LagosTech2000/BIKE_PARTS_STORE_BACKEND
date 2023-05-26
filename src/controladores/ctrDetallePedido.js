const detalleP = require('../modelos/detallePedido')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')


exports.Inicio = (req,res)=>{
    const moduloDetallePedidos ={
           modulo:'/api/detallePedidos',
           descripcion:'Contiene informacion de los detalles de los pedidos',
           rutas:[
            { 
                ruta:'/api/detallePedidos/listar',
             descripcion:'Lista los detalles de los pedidos',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/detallePedidos/guardar',
                descripcion:'guarda los detalles de los pedidos',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/detallePedidos/editar',
                descripcion:'Modifica los detalles de los pedidos',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/detallePedidos/eliminar',
                descripcion:'Elimina los detalles de los pedidos',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloDetallePedidos,res)
  
}

exports.listar = async(req,res)=>{
    const listaDetallePedidos= await detalleP.findAll()     
    MSJ(exito,listaDetallePedidos,res)
}

exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const {cantidad, articuloId, pedidoId } = req.body;

    if (!cantidad) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'cantidad'
        }        
        
        MSJ(exito,er,res)

    } else {

            await  detalleP.create({
                cantidad: cantidad,
                pedidoId,
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
    const { cantidad,pedidoId, articuloId} = req.body;

    if(!Id){
        const er = {
            msj:'Debe escribir el Id'
        }
        MSJ(exito,er,res)
        
    }else{
        if (!cantidad) {
            const er={
                msj:'Debe Debe enviar los datos obligatorios',
                parametros:'cantidad'
            }
    
        } else{

            var buscarDetallePedido = await detalleP.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarDetallePedido) {                
                const er = {
                    msj:'El Id del detalle no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscarDetallePedido.cantidad = cantidad
                buscarDetallePedido.pedidoId = pedidoId
                buscarDetallePedido.articuloId = articuloId

                await buscarDetallePedido.save().then((data) => { 
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
            var buscarDetallePedido= await detalleP.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarDetallePedido) {
                
                MSJ(exito,'EL ID NO EXISTE',res)
            } else {                
                await buscarDetallePedido.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro ',res)
                    })
                    .catch((er) => {
                        
                        MSJ(exito,'Error al eliminar Registro',res)
                    })            
        }
}
 
}