exports.MSJ=(msj,data,res)=>{
    
    var mensajes={
        msj:msj,
        datos:data
    }
    
    res.setHeader('Content-Type', 'application/json')   
    res.json(mensajes);
     
     
}    

exports.exito='La peticion se realizo con exito'




    
