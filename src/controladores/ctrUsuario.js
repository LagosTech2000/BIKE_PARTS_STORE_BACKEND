const usuario = require('../modelos/usuario')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')
const fs = require("fs")
const passport = require('../configuraciones/passport');
const path = require("path")
const bcrypt = require('bcrypt');
exports.Inicio = (req,res)=>{
    const moduloUsuarios ={
           modulo:'/api/usuarios',
           descripcion:'Contiene informacion de los Usuarios',
           rutas:[
            { 
                ruta:'/api/usuarios/listar',
             descripcion:'Lista los usuarios',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/usuarios/guardar',
                descripcion:'guarda los datos de usuarios',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/usuarios/editar',
                descripcion:'Modifica los datos de un usuario',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/usuarios/eliminar',
                descripcion:'Elimina los datos de un usuario',
                metodo:'DELETE',
                parametros:'ninguno'
            },
            ,{
                ruta:'/api/usuarios/imagen',
                descripcion:'guarda imagen de un usuario',
                metodo:'POST',
                parametros:'ninguno'
            }
            ,{
                ruta:'/api/usuarios/buscar',
                descripcion:'Busca Un Usuario por su nombre',
                metodo:'GET',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloUsuarios,res)
  
}

exports.listar = async(req,res)=>{
    const listaUsuarios= await usuario.findAll()     
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

            await  usuario.create({
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

            await  usuario.create({
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
    const {login} = req.query;
    const { nombre ,dni,correo,clave,direccion,telefono,imagen,sexo,fechaNac} = req.body;

    if(!login){
        const er = {
            msj:'Debe escribir el Id'
        }
        MSJ(exito,er,res)
        
    }else{
        if (!nombre||!telefono||!direccion) {
            const er={
                msj:'Debe Debe enviar los datos obligatorios',
                parametros:'nombre, telefono, direccion'
            }
            
            
    
        } else{

            var buscarUsuario = await usuario.findOne({
                where: {
                    login: login
                }
            })

            if (!buscarUsuario) {                
                const er = {
                    msj:'El Id del usuario no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscarUsuario.nombre = nombre
                buscarUsuario.direccion = direccion
                buscarUsuario.telefono=telefono

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
            var buscarUsuario = await usuario.findOne({
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

exports.recibirImagen = async (req, res) =>{
    const {filename} = req.file;
    const {login} = req.query;          
    console.log(filename)        
    try{
        errores=[];
        data=[];
        var buscarUsuario = await usuario.findOne({
            where:{
                login: login
            }
        });
        if(!buscarUsuario){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/usuarios/' + filename));
            if(!buscarImagen){
                MSJ(exito,'La imagen no existe',res);
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/usuarios/' + filename));//FS: Fyle System
                MSJ(exito,'Imagen eliminada',res);
            }
            error.msg='El id del usuario no existe, se elimino la imagen enviada';
            error.parametro='id';
            errores.push(error);
            MSJ(exito,'Peticion ejecutada correctamente',res);
        }
        else{           

            buscarUsuario.imagen=filename;//Sustituir la imagen anterior, por el nuevo nombre de la img que guardamos
            
            await buscarUsuario.save() //Guardamos
            .then((data)=>{
                MSJ(exito,'Peticion ejecutada correctamente',res);
            })
            .catch((error)=>{
                MSJ(exito,'Peticion ejecutada correctamente',res);
            });
        }
    } catch(error){        
        console.log(error);
        MSJ(exito,'Error al ejecutar la peticion\n'+error,res);
    
    }


}

exports.listarSinUser= async (req,res)=>{

    const {id} = req.query

    if(id){

        var buscarUsuario =  await usuario.findAll()

        if(buscarUsuario){

            function removeObjectWithId(arr, id) {
                const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
              
                if (objWithIdIndex > -1) {
                  arr.splice(objWithIdIndex, 1);
                }
              
                return arr;
              }
    
              
              var idx ;
              
              buscarUsuario.map((item)=>{

                  if(item.id==id){
                      idx=item.id;
                      
                    }
                    
                })
                
            var a = removeObjectWithId(buscarUsuario,idx)

            function shuffle(array) {
                const newArray = [...array]
                const length = newArray.length
              
                for (let start = 0; start < length; start++) {
                  const randomPosition = Math.floor((newArray.length - start) * Math.random())
                  const randomItem = newArray.splice(randomPosition, 1)
              
                  newArray.push(...randomItem)
                }
              
                return newArray
              }

              


            MSJ(exito,shuffle(a),res)
            
        }else{
            MSJ(exito,"No se Encontro el Usuario",res)    
        }


    }else{
        MSJ(exito,"Debe Ingresar El Id",res)
    }


}


exports.buscarNombre= async(req,res)=>{
    
    const {login} = req.query;
    
    if(!login){
        res.send('Debe Escribir el Usuario');
    }else{
            var buscarUsuario = await usuario.findOne({
                where: {
                    login:login,
                }
            })

            if (!buscarUsuario) {
                
                MSJ(exito,'Usuario No Encontrado',res)
            } else {                
               
                MSJ(exito,buscarUsuario,res)
                          
        }


}

}


exports.actualizarContra= async(req,res)=>{
    const {login} = req.query    
    const {pass} = req.body    

    if(login||pass){
       

        var buscarUsuario = await usuario.findOne({
            where: {
                login:login,
            }
        })

        if (!buscarUsuario) {
            
            MSJ(exito,'Usuario No Encontrado',res)
        } else {                

            const hash = bcrypt.hashSync(pass, 10);
            buscarUsuario.clave = hash;
            await buscarUsuario.save().then((data) => { 
                console.log(data)                        
                const er = {
                    msj:'La Contraseña Fue Actualizada Con Exito'
                }
                MSJ(exito,er,res)
            })
            .catch((er) => {                        
                MSJ(exito,er,res)
            })
            
                      
    }
     
    
    }else{
        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'login, pass'
        }
         MSJ(exito,er,res)
    }


}





