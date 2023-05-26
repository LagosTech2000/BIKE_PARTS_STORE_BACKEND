const Cliente = require('../modelos/Cliente')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')
const fs = require("fs")
const passport = require('../configuraciones/passport');
const path = require("path")
exports.Inicio = (req,res)=>{
    const moduloClientes ={
           modulo:'/api/Clientes',
           descripcion:'Contiene informacion de los clientes',
           rutas:[
            { 
                ruta:'/api/Clientes/listar',
             descripcion:'Lista los clientes',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/Clientes/guardar',
                descripcion:'guarda los clientes',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/Clientes/editar',
                descripcion:'Modifica los datos de clientes',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/Clientes/eliminar',
                descripcion:'Elimina los datos de clientes',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloClientes,res)
  
}

exports.listar = async(req,res)=>{
    const listaCliente= await Cliente.findAll()    
    MSJ(exito,listaCliente,res)
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

            await  Cliente.create({
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

            await  Cliente.create({
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

            var buscarCliente = await Cliente.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarCliente) {                
                const er = {
                    msj:'El Id del  no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscarCliente.nombre = nombre
                buscarCliente.dni = dni
                buscarCliente.correo = correo
                buscarCliente.apellido =apellido
                buscarCliente.sexo =sexo  
                buscarCliente.direccion =direccion
                buscarCliente.telefono=telefono
                buscarCliente.imagen=imagen
                buscarCliente.fechaNac = fechaNac
                    

                await buscarCliente.save().then((data) => { 
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
            var buscarCliente = await Cliente.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarCliente) {
                
                MSJ(exito,'El Id No existe',res)
            } else {                
                await buscarCliente.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro',res)
                    })
                    .catch((er) => {
                        
                        MSJ(exito,'Error al eliminar Registro',res)
                    })            
        }


}
 
}

exports.recibirImagen = async (req, res) =>{
    const {filename} = req.file;
    const {Id} = req.body;
    console.log(Id);
    console.log(filename);
    try{
        errores=[];
        data=[];
        var buscarCliente = await Cliente.findOne({
            where:{
                id: Id
            }
        });
        if(!buscarCliente){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/Clientes/' + filename));
            if(!buscarImagen){
                MSJ(exito,'La imagen no existe',res);
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/Clientes/' + filename));//FS: Fyle System
                MSJ(exito,'Imagen eliminada',res);
            }
            error.msg='El id del  no existe, se elimino la imagen enviada';
            error.parametro='id';
            errores.push(error);
            MSJ(exito,'Peticion ejecutada correctamente',res);
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/Clientes/' + buscarCliente.imagen));//Buscando la imagen que esta en Articulo
            if(!buscarImagen){
                console.log('No encontro la imagen');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/Clientes/' + buscarCliente.imagen));
                console.log('Imagen eliminada');
            }
            buscarCliente.imagen=filename;//Sustituir la imagen anterior, por el nuevo nombre de la img que guardamos
            await buscarCliente.save()//Guardamos
            .then((data)=>{
                MSJ(exito,'Peticion ejecutada correctamente',res);
            })
            .catch((error)=>{
                MSJ(exito,'Peticion ejecutada correctamente',res);
            });
        }
    } catch(error){
        errores.push(error);
        console.log(error);
        MSJ(exito,'Error al ejecutar la peticion\n'+error,res);
    
    }
}