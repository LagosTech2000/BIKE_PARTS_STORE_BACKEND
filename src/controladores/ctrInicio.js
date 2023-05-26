exports.Inicio = (req,res)=>{

    const sigmar = {
        api:'Interfaz de programacion',
        sigmer:'Sistema De Gestion De MotoRepuestos',
        desarrollador:'Fernando Lagos',
        modulos:[
            {nombre:'usuarios',ruta:'/api/usuarios'},            
        ]
    }
  
    res.json(sigmar);
     
}
