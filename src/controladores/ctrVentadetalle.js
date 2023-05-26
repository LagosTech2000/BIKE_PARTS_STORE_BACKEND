const VentasDetalle = require('../modelos/ventaDetalle')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')
exports.Inicio = (req,res)=>{
    const moduloVentasDetalle ={
           modulo:'/api/ventadetalles',
           descripcion:'Contiene informacion del detalle de venta',
           rutas:[
            { 
                ruta:'/api/ventadetalles/listar',
             descripcion:'Lista el registro de los detalle de venta',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/ventadetalles/guardar',
                descripcion:'guarda los detalle de venta',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/ventadetalles/editar',
                descripcion:'Modifica los detalle de venta',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/ventadetalles/eliminar',
                descripcion:'Elimina los detalle de venta',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloVentasDetalle,res)
  
}

exports.listar = async(req,res)=>{
    const listarVentadetalle= await VentasDetalle.findAll()     
    MSJ(exito,listarVentadetalle,res)
}

exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const {cantidad, total, ventaId, detalleInid} = req.body;

    if (!cantidad||!total) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'cantidad, total'
        }        
        
        MSJ(exito,er,res)

    } else {

            await  VentasDetalle.create({
                cantidad: cantidad,
                total: total ,
                ventaId,
                detalleInid
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
const { cantidad,total, ventaId, detalleInid} = req.body;

if(!Id){
    const er = {
        msj:'Debe escribir el Id'
    }
    MSJ(exito,er,res)
    
}else{
    if (!cantidad||!total) {
        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'cantidad, total'
        }
        
    } else{

        var buscarDetalleventa = await VentasDetalle.findOne({
            where: {
                id: Id
            }
        })

        if (!buscarDetalleventa) {                
            const er = {
                msj:'El Id ingresado no existe'
            }
            MSJ(exito,er,res)
        } else {
            buscarDetalleventa.cantidad=cantidad;
            buscarDetalleventa.total=total;    
            buscarDetalleventa.ventaId=ventaId;
            buscarDetalleventa.detalleInid=detalleInid;                  

            await buscarDetalleventa.save().then((data) => { 
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
        var buscarDetalleventa = await VentasDetalle.findOne({
            where: {
                id: Id
            }
        })

        if (!buscarDetalleventa) {
            
            MSJ(exito,'El Id ingresado No existe',res)
        } else {                
            await buscarDetalleventa.destroy({where: Id})
                .then((data) => {                         
                    MSJ(exito,'Se Elimino el registro',res)
                })
                .catch((er) => {
                    
                    MSJ(exito,'Error al eliminar Registro',res)
                })            
    }


}

}
