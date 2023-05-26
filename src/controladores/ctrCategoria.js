const categoria = require('../modelos/categoria')
const {validationResult} = require('express-validator')
const {MSJ,exito} = require('../componentes/mensaje')

exports.Inicio = (req,res)=>{
    const modulocategorias ={
           modulo:'/api/categorias',
           descripcion:'Contiene informacion de los categorias',
           rutas:[
            { 
                ruta:'/api/categorias/listar',
             descripcion:'Lista las categorias',
             metodo:'GET',
             parametros:'ninguno'
            },{
                ruta:'/api/categorias/guardar',
                descripcion:'guarda los datos de categorias',
                metodo:'POST',
                parametros:'ninguno'

            },{

                ruta:'/api/categorias/editar',
                descripcion:'Modifica los datos de un categoria',
                metodo:'PUT',
                parametros:'ninguno'

            },{
                ruta:'/api/categorias/eliminar',
                descripcion:'Elimina los datos de un categoria',
                metodo:'DELETE',
                parametros:'ninguno'
            }

           ]
    }
    MSJ(exito,modulocategorias,res)
  
}

exports.listar = async(req,res)=>{
    const listacategorias= await categoria.findAll()     
    MSJ(exito,listacategorias,res)
}

exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const { id, nombre , descripcion} = req.body;

    if (!nombre||!descripcion) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'nombre, descripcion'
        }        
        
        MSJ(exito,er,res)

    } else {

            await  categoria.create({
                id: id,
                nombre: nombre ,
                descripcion: descripcion              
                
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
    const { nombre,descripcion} = req.body;

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

            var buscarCategoria = await categoria.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarCategoria) {                
                const er = {
                    msj:'El Id del categoria no existe'
                }
                MSJ(exito,er,res)
            } else {
               buscarCategoria.nombre=nombre;
               buscarCategoria.descripcion=descripcion;                    

                await buscarCategoria.save().then((data) => { 
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
            var buscarCategoria = await categoria.findOne({
                where: {
                    id: Id
                }
            })

            if (!buscarCategoria) {
                
                MSJ(exito,'El Id No existe',res)
            } else {                
                await buscarCategoria.destroy({where: Id})
                    .then((data) => {                         
                        MSJ(exito,'Se Elimino el registro',res)
                    })
                    .catch((er) => {
                        
                        MSJ(exito,'Error al eliminar Registro',res)
                    })            
        }


}
 
}
