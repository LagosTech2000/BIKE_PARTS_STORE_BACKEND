const descarteCliente = require('../modelos/descarteCliente')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')
const fs = require("fs")
const passport = require('../configuraciones/passport');
const path = require("path")
exports.Inicio = (req,res)=>{
    const moduloDescarteClientes ={
           modulo:'/api/descarteClientes',
           descripcion:'Contiene informacion de los Usuarios',
           rutas:[
            { 
                ruta:'/api/descarteClientes/listar',
             descripcion:'Lista los descartes de clientes',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/descarteClientes/guardar',
                descripcion:'guarda los descartes de clientes',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/descarteClientes/editar',
                descripcion:'Modifica los descartes de clientes',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/descarteClientes/eliminar',
                descripcion:'Elimina los datos de descartes de clientes',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloDescarteClientes,res)
  
}

exports.listar = async(req,res)=>{
    const listaDescarteCliente= await descarteCliente.findAll()     
    MSJ(exito,listaDescarteCliente,res)
}

exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const { nombre,apellido ,dni,direccion,telefono,correo,imagen,sexo,fechaNac} = req.body;

    if (!apellido||!dni||!correo||!telefono||!nombre) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'nombre, apellido, dni, correo, telefono'
        }        
        
        MSJ(exito,er,res)

    } else {
    
       if(imagen){

            await  descarteCliente.create({
                dni: dni,
                nombre: nombre ,
                apellido: apellido,
                correo: correo,
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

            await  descarteCliente.create({
                dni: dni,
                nombre: nombre ,
                apellido: apellido,
                correo: correo,
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
    const { nombre,apellido ,dni,direccion,telefono,correo,imagen,sexo,fechaNac} = req.body;

    if(!Id){
        const er = {
            msj:'Debe escribir el Id'
        }
        MSJ(exito,er,res)
        
    }else{
        if (!apellido||!dni||!correo||!telefono||!nombre) {
            const er={
                msj:'Debe Debe enviar los datos obligatorios',
                parametros:'nombre, apellido, dni, correo, telefono'
            }
            
            
    
        } else{

            var buscarDescarteCliente = await descarteCliente.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarDescarteCliente) {                
                const er = {
                    msj:'El Id del descarte no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscarDescarteCliente.nombre = nombre
                buscarDescarteCliente.dni = dni
                buscarDescarteCliente.correo = correo
                buscarDescarteCliente.apellido =apellido
                buscarDescarteCliente.sexo =sexo  
                buscarDescarteCliente.direccion =direccion
                buscarDescarteCliente.telefono=telefono
                buscarDescarteCliente.imagen=imagen
                buscarDescarteCliente.fechaNac = fechaNac
                    

                await buscarDescarteCliente.save().then((data) => { 
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
            var buscarDescarteCliente = await descarteCliente.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarDescarteCliente) {
                
                MSJ(exito,'El Id No existe',res)
            } else {                
                await buscarDescarteCliente.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro',res)
                    })
                    .catch((er) => {
                        
                        MSJ(exito,'Error al eliminar Registro',res)
                    })            
        }


}
 
}
