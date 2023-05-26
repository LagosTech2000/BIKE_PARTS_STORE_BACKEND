const articulo = require('../modelos/articulo')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')
const fs = require("fs")
const passport = require('../configuraciones/passport');
const path = require("path");
const { Op } = require('sequelize');

var errores = []
var data = []
var error ={
    msg:'',
    parametro:''
}   

exports.Inicio = (req,res)=>{
    const moduloArticulos ={
           modulo:'/api/articulos',
           descripcion:'Contiene informacion de los artiuclos',
           rutas:[
            { 
                ruta:'/api/articulos/listar',
             descripcion:'Lista los articulos',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/articulos/guardar',
                descripcion:'guarda los articulos',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/articulos/editar',
                descripcion:'Modifica los datos de un articulo',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/articulos/eliminar',
                descripcion:'Elimina los datos de un articulo',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,moduloArticulos,res)
  
}

exports.listar = async(req,res)=>{
    const listaArticulos= await articulo.findAll()     
    MSJ(exito,listaArticulos,res)
}

exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const { nombre ,codigo,descripcion,precio,imagen } = req.body;

    if (!nombre||!codigo||!descripcion||!precio) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'nombre, codigo, descripcion, precio'
        }        
        
        MSJ(exito,er,res)

    } else {

        if(imagen){
            await  articulo.create({
                codigo: codigo,
                nombre: nombre ,
                descripcion: descripcion ,
                imagen: imagen ,
                precio:precio
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
            await  articulo.create({
                codigo: codigo,
                nombre: nombre ,
                descripcion: descripcion ,
                imagen: 'defaultA.png' ,
                precio:precio
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

            var buscarArticulo = await articulo.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarArticulo) {                
                const er = {
                    msj:'El Id del articulo no existe'
                }
                MSJ(exito,er,res)
            } else {
                buscarArticulo.nombre = nombre
                buscarArticulo.codigo = codigo
                buscarArticulo.descripcion = descripcion
                buscarArticulo.imagen =imagen
                await buscarArticulo.save().then((data) => { 
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
            var buscarArticulo = await articulo.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarArticulo) {
                
                MSJ(exito,'EL ID NO EXISTE',res)
            } else {                
                await buscarArticulo.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro ',res)
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
        var buscarArticulo = await articulo.findOne({
            where:{
                id: Id
            }
        });
        if(!buscarArticulo){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/articulos/' + filename));
            if(!buscarImagen){
                MSJ(exito,'La imagen no existe',res);
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/articulos/' + filename));//FS: Fyle System
                MSJ(exito,'Imagen eliminada',res);
            }
            error.msg='El id del articulo no existe, se elimino la imagen enviada';
            error.parametro='id';
            errores.push(error);
            MSJ(exito,'Peticion ejecutada correctamente',res);
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/articulos/' + buscarArticulo.imagen));//Buscando la imagen que esta en Articulo
            if(!buscarImagen){
                console.log('No encontro la imagen');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/articulos/' + buscarArticulo.imagen));
                console.log('Imagen eliminada');
            }
            buscarArticulo.imagen=filename;//Sustituir la imagen anterior, por el nuevo nombre de la img que guardamos
            await buscarArticulo.save()//Guardamos
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

exports.buscarArticulo= async(req,res)=>{
    
    const {nombre} = req.query;
    
    if(!nombre){
        MSJ(exito,'Debe Escribir el Articulo',res);
    }else{
            var buscarArticulo = await articulo.findAll({      

                where: {         
                         
                        nombre:{
                            [Op.like]:"%"+nombre+"%"
                        }
                    
                    
               }
            })

            if (!buscarArticulo) {
                
                MSJ(exito,'Articulo No Encontrado',res)

            } else {                
               
                MSJ(exito,buscarArticulo,res)
                          
        }


}

}
