const descarteprove = require('../modelos/descarteprove')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')


exports.Inicio = (req,res)=>{
    const modulodescarteprove ={
           modulo:'/api/descarteproves',
           descripcion:'Contiene informacion del descarte de proveedores',
           rutas:[
            { 
                ruta:'/api/descarteproves/listar',
             descripcion:'Lista el descarte de proveedores',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/descarteproves/guardar',
                descripcion:'guarda los datos del descarte de proveedores',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/descarteproves/editar',
                descripcion:'Modifica los datos del descarte de proveedores',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/descarteproves/eliminar',
                descripcion:'Elimina los datos del descarte de proveedores',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,modulodescarteprove,res)
  
}

exports.listar = async(req,res)=>{
    const listadescarteproves= await descarteprove.findAll()     
    MSJ(exito,listadescarteproves,res)
}


exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const { id, nombre , telefono, direccion, correo} = req.body;

    if (!nombre|!correo) {

        const er={
            msj:'Debe enviar los datos obligatorios',
            parametros:'nombre, correo'
        }        
        
        MSJ(exito,er,res)

    } else {

            await  descarteprove.create({
                id: id,
                nombre: nombre ,
                telefono: telefono,
                direccion: direccion,
                correo: correo              
                
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
    const { nombre,telefono, direccion, correo} = req.body;

    if(!Id){
        const er = {
            msj:'Debe escribir el Id'
        }
        MSJ(exito,er,res)
        
    }else{
        if (!nombre||!telefono||!direccion||!correo) {
            const er={
                msj:'Debe enviar los datos obligatorios',
                parametros:'nombre, telefono, direccion, correo'
            }
            
        } else{

            var buscardescarteproves = await descarteprove.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscardescarteproves) {                
                const er = {
                    msj:'El Id del detalle proveedores no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscardescarteproves.nombre=nombre;
                buscardescarteproves.telefono=telefono; 
                buscardescarteproves.direccion=direccion;
                buscardescarteproves.correo=correo;                       

                await buscardescarteproves.save().then((data) => { 
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
            var buscardescarteproves = await descarteprove.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscardescarteproves) {
                
                MSJ(exito,'El Id No existe',res)
            } else {                
                await buscardescarteproves.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro',res)
                    })
                    .catch((er) => {
                        
                        MSJ(exito,'Error al eliminar Registro',res)
                    })            
        }


}
 
}
