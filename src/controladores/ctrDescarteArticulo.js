const DescarteArticulo = require('../modelos/descarteArticulo')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')
const fs = require("fs")
const passport = require('../configuraciones/passport');
const path = require("path")

var errores = []
var data = []
var error ={
    msg:'',
    parametro:''
}   

exports.Inicio = (req,res)=>{
    const moduloDescarteArticulos ={
           modulo:'/api/descarteArticulos',
           descripcion:'Contiene informacion de los descartes de artiuclos',
           rutas:[
            { 
                ruta:'/api/descarteArticulos/listar',
             descripcion:'Lista los descartes de articulos',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/descarteArticulos/guardar',
                descripcion:'guarda los descartes de articulos',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/descarteArticulos/editar',
                descripcion:'Modifica los datos de un articulo',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/descarteArticulos/eliminar',
                descripcion:'Elimina los datos de un articulo',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloDescarteArticulos,res)
  
}

exports.listar = async(req,res)=>{
    const listadescarteArticulos= await DescarteArticulo.findAll()     
    MSJ(exito,listadescarteArticulos,res)
}

exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const { nombre ,descripcion,imagen } = req.body;

    if (!nombre||!descripcion) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'nombre, descripcion, '
        }        
        
        MSJ(exito,er,res)

    } else {

        if(imagen){
            await  DescarteArticulo.create({
                nombre: nombre ,
                descripcion: descripcion ,
                imagen: imagen    
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

         }else{
            await  DescarteArticulo.create({
                nombre: nombre ,
                descripcion: descripcion ,
                imagen: 'defaultA.png' 
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
}

exports.editar = async (req,res)=>{    
    const {Id} = req.query;
    const { nombre ,descripcion, imagen} = req.body;

    if(!Id){
        const er = {
            msj:'Debe escribir el Id'
        }
        MSJ(exito,er,res)
        
    }else{
        if (!nombre||!descripcion) {
            const er={
                msj:'Debe Debe enviar los datos obligatorios',
                parametros:'nombre, descripcion'
            }
            
            
    
        } else{

            var buscarDescarteArticulo = await DescarteArticulo.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarDescarteArticulo) {                
                const er = {
                    msj:'El Id del descarte del articulo no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscarDescarteArticulo.nombre = nombre
                buscarDescarteArticulo.descripcion = descripcion
                buscarDescarteArticulo.imagen =imagen
                await buscarDescarteArticulo.save().then((data) => { 
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
            var buscarDescarteArticulo = await DescarteArticulo.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarDescarteArticulo) {
                
                MSJ(exito,'EL ID NO EXISTE',res)
            } else {                
                await buscarDescarteArticulo.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro ',res)
                    })
                    .catch((er) => {
                        
                        MSJ(exito,'Error al eliminar Registro',res)
                    })            
        }


}
 
}
