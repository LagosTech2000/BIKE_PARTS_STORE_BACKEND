const comentario = require('../modelos/comentarios')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')
const fs = require("fs")
const passport = require('../configuraciones/passport');
const path = require("path");
const { Op, Model } = require('sequelize');
const usuario = require('../modelos/usuario');
const { markAsUntransferable } = require('worker_threads');

var errores = []
var data = []
var error ={
    msg:'',
    parametro:''
}   

exports.Inicio = (req,res)=>{
    const moduloComentarios ={
           modulo:'/api/comentarios',
           descripcion:'Contiene informacion de los artiuclos',
           rutas:[
            { 
                ruta:'/api/comentarios/listar',
             descripcion:'Lista los comentarios',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/comentarios/guardar',
                descripcion:'guarda los comentarios',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/comentarios/editar',
                descripcion:'Modifica los datos de un comentario',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/comentarios/eliminar',
                descripcion:'Elimina los datos de un comentario',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloComentarios,res)
  
}

exports.listar = async(req,res)=>{
    const listaComentarios= await comentario.findAll({ include: usuario })     
    
    const sortedDesc = listaComentarios.sort(
        (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt),
      );
      
    MSJ(exito,sortedDesc,res)
}

exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const {valoracion, titulo ,mensaje ,UsuarioId} = req.body;

    if (!titulo||!mensaje||!UsuarioId||!valoracion) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'valoracion, titulo ,mensaje, UsuarioId'
        }        
        
        MSJ(exito,er,res)

    } else {

              
        const busuario = await usuario.findOne(
              {
                where:{
                   id:UsuarioId
                }
              })
    
         if(busuario){
                
             await comentario.create({
                     titulo:titulo,
                      mensaje:mensaje,
                      UsuarioId:UsuarioId,
                      valoracion:valoracion
                    }).then((data)=>{
                        MSJ(exito,data,res)
                    }

                    ).catch((err)=>console.log(err))
               
         }else{
         MSJ(exito,"No Se Encontro El Usuario",res)

         }

    }
}
}

exports.editar = async (req,res)=>{    
    const {Id} = req.query;
    const { nombre ,codigo,descripcion} = req.body;

    if(!Id){
        const er = {
            msj:'Debe escribir el Id'
        }
        MSJ(exito,er,res)
        
    }else{
        if (!nombre||!codigo||!descripcion) {
            const er={
                msj:'Debe Debe enviar los datos obligatorios',
                parametros:'nombre, codigo, descripcion'
            }
            
            
    
        } else{

            var buscarComentario = await comentario.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarComentario) {                
                const er = {
                    msj:'El Id del comentario no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscarComentario.nombre = nombre
                buscarComentario.codigo = codigo
                buscarComentario.descripcion = descripcion
                buscarComentario.imagen =imagen
                await buscarComentario.save().then((data) => { 
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
            var buscarComentario = await comentario.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarComentario) {
                
                MSJ(exito,'EL ID NO EXISTE',res)
            } else {                
                await buscarComentario.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro',res)
                    })
                    .catch((er) => {
                        
                        MSJ(exito,'Error al eliminar Registro',res)
                    })            
        }


}
 
}

exports.buscarComentario= async(req,res)=>{
    
    const {nombre} = req.query;
    
    if(!nombre){
        MSJ(exito,'Debe Escribir el Comentario',res);
    }else{
            var buscarComentario = await comentario.findAll({      

                where: {         
                         
                        nombre:{
                            [Op.like]:"%"+nombre+"%"
                        }
                    
                    
               }
            })

            if (!buscarComentario) {
                
                MSJ(exito,'Comentario No Encontrado',res)

            } else {                
               
                MSJ(exito,buscarComentario,res)
                          
        }


}

}
