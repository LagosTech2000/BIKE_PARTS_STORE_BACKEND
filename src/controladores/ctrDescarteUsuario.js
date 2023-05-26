const descarteUsuario = require('../modelos/descarteUsuario')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')
const fs = require("fs")
const passport = require('../configuraciones/passport');
const path = require("path")

exports.Inicio = (req,res)=>{
    const moduloDescarteUsuarios ={
           modulo:'/api/descarteUsuarios',
           descripcion:'Contiene informacion de los Usuarios',
           rutas:[
            { 
                ruta:'/api/descarteUsuarios/listar',
             descripcion:'Lista los descarteUsuarios',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/descarteUsuarios/guardar',
                descripcion:'guarda los datos de descarteUsuarios',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/descarteUsuarios/editar',
                descripcion:'Modifica los datos de un descarteUsuario',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/descarteUsuarios/eliminar',
                descripcion:'Elimina los datos de un descarteUsuario',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloUsuarios,res)
  
}

exports.listar = async(req,res)=>{
    const listaUsuarios= await descarteUsuario.findAll()     
    MSJ(exito,listaUsuarios,res)
}

exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const { nombre,login ,dni,correo,clave,telefono,direccion,imagen,sexo,fechaNac} = req.body;

    if (!login||!dni||!correo||!clave||!nombre) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'nombre, login, dni, correo, clave'
        }        
        
        MSJ(exito,er,res)

    } else {
    
       if(imagen){

            await  descarteUsuario.create({
                dni: dni,
                nombre: nombre ,
                login: login,
                correo: correo,
                clave: clave ,
                telefono:telefono,
                direccion:direccion,
                imagen: imagen,
                sexo: sexo,
                fechaNac: fechaNac
                
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

            await  descarteUsuario.create({
                dni: dni,
                nombre: nombre ,
                login: login,
                correo: correo,
                clave: clave ,
                telefono:telefono,
                direccion:direccion,
                imagen: 'defaultP.png',
                sexo: sexo,
                fechaNac: fechaNac
                
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
    const { nombre ,dni,correo,clave,direccion,telefono,imagen,sexo,fechaNac} = req.body;

    if(!Id){
        const er = {
            msj:'Debe escribir el Id'
        }
        MSJ(exito,er,res)
        
    }else{
        if (!nombre||!dni||!correo||!clave) {
            const er={
                msj:'Debe Debe enviar los datos obligatorios',
                parametros:'nombre, dni, correo, clave'
            }
            
            
    
        } else{

            var buscarUsuario = await descarteUsuario.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarUsuario) {                
                const er = {
                    msj:'El Id del descarteUsuario no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscarUsuario.nombre = nombre
                buscarUsuario.dni = dni
                buscarUsuario.correo = correo
                buscarUsuario.clave =clave
                buscarUsuario.sexo =sexo  
                buscarUsuario.direccion =direccion
                buscarUsuario.telefono=telefono
                buscarUsuario.imagen=imagen
                buscarUsuario.fechaNac = fechaNac
                    

                await buscarUsuario.save().then((data) => { 
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
            var buscarUsuario = await descarteUsuario.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarUsuario) {
                
                MSJ(exito,'El Id No existe',res)
            } else {                
                await buscarUsuario.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro',res)
                    })
                    .catch((er) => {
                        
                        MSJ(exito,'Error al eliminar Registro',res)
                    })            
        }


}
 
}


exports.buscarNombre= async(req,res)=>{
    
    const {nombre} = req.query;
    
    if(!nombre){
        res.send('Debe Escribir el Nombre');
    }else{
            var buscarUsuario = await descarteUsuario.findOne({
                where: {
                    nombre:nombre
                }
            })

            if (!buscarUsuario) {
                
                MSJ(exito,'Usuario No Encontrado',res)
            } else {                
               
                MSJ(exito,buscarUsuario,res)
                          
        }


}

}
