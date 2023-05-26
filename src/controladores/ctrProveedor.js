const proveedor = require('../modelos/proveedor')
const { validationResult } = require('express-validator')
const { MSJ, exito } = require('../componentes/mensaje')

exports.Inicio = (req, res) => {
    const moduloProveedores = {
        modulo: '/api/proveedores',
        descripcion: 'Contiene informacion de los proveedores',
        rutas: [
            {
                ruta: '/api/proveedores/listar',
                descripcion: 'Lista los proveedores',
                metodo: 'GET',
                parametros: 'ninguno'
            }, {
                ruta: '/api/proveedores/guardar',
                descripcion: 'guarda los datos de proveedores',
                metodo: 'POST',
                parametros: 'ninguno'

            }, {

                ruta: '/api/proveedores/editar',
                descripcion: 'Modifica los datos de un proveedor',
                metodo: 'PUT',
                parametros: 'ninguno'

            }, {
                ruta: '/api/proveedores/eliminar',
                descripcion: 'Elimina los datos de un proveedor',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }

        ]
    }
    MSJ(exito, moduloProveedores, res)

}

exports.listar = async (req, res) => {
    const listaProveedors = await proveedor.findAll()
    MSJ(exito, listaProveedors, res)
}
exports.guardar = async(req,res)=>{    
    const validacion=validationResult(req)

    if(!validacion.isEmpty()){
       MSJ(exito,validacion,res)
    }else{
    const {nombre,dni,telefono,direccion,sexo, correo} = req.body;

    if (!nombre||!dni ||!telefono ||!direccion ||!correo) {

        const er={
            msj:'Debe Debe enviar los datos obligatorios',
            parametros:'nombre, dni, telefono, direccion, correo'
        }        
        
        MSJ(exito,er,res)

    }else{
            await  proveedor.create({
                nombre: nombre , 
                dni: dni,           
                telefono:telefono,
                direccion:direccion,
                sexo: sexo,
                correo: correo
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

exports.editar = async (req, res) => {   
        const {Id} = req.query;
        const { nombre,dni,telefono,direccion, sexo, correo} = req.body;
    
        if(!Id){
            const er = {
                msj:'Debe escribir el Id'
            }
            MSJ(exito,er,res)
            
        }else{
            if (!nombre||!dni ||!telefono ||!direccion ||!correo) {
                const er={
                    msj:'Debe Debe enviar los datos obligatorios',
                    parametros:'nombre, dni, telefono, direccion, correo'
                }    
        
            } else{
    
                var buscarProveedor = await proveedor.findOne({
                    where: {
                        id: Id
                    }
                })
    
                if (!buscarProveedor) {                
                    const er = {
                        msj:'El Id del proveedor no existe'
                    }
                    MSJ(exito,er,res)
                } else {
                    buscarProveedor.nombre = nombre
                    buscarProveedor.dni = dni
                    buscarProveedor.telefono = telefono
                    buscarProveedor.direccion = direccion
                    buscarProveedor.sexo = sexo
                    buscarProveedor.correo = correo
                    await buscarProveedor.save().then((data) => { 
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

exports.eliminar = async (req, res) => {
    const { Id } = req.query;


    if (!Id) {
        res.send('Debe Escribir el Id');
    } else {
        var buscarProveedor = await proveedor.findOne({
            where: {
                id: Id
            }
        })

        if (!buscarProveedor) {

            MSJ(exito, 'El Id no existe', res)
        } else {
            await buscarProveedor.destroy({ where: Id })
                .then((data) => {
                    MSJ(exito, 'Se Elimino el registro', res)
                })
                .catch((er) => {

                    MSJ(exito, 'Error al eliminar Registro', res)
                })
        }
    }

}
