const { validationResult } = require('express-validator');
const Usuario = require('../modelos/usuario');
const Cliente = require('../modelos/cliente');
const { Op } = require('sequelize');
const {MSJ,exito} = require('../componentes/mensaje');
const EnviarCorreo = require('../configuraciones/correo');
const {EnviarSMS} = require("../configuraciones/sms");
const gpc = require('generate-pincode');
const passport = require('../configuraciones/passport');
const bcrypt = require('bcrypt');

function validacion(req) {
    var errores=[];
    var validaciones = validationResult(req);
    var error = {
        mensaje: '',
        parametro: '',
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });
    }
    return errores;
};
exports.Inicio = async (req, res) => {
    var errores = validacion(req);
    const listaModulos =
        [
            {
                modulo: "Autenticación",
                rutas: [
                    {
                        ruta: "/api/autenticacion",
                        metodo: "get",
                        parametros: "",
                        descripcion: "Inicio del módulo de autenticación"
                    },
                    {
                        ruta: "/api/autenticacion/pin",
                        metodo: "post",
                        parametros: {
                            correo: "Correo electronico del usuario, al que se le enviara un correo con el pin. Obligatorio."
                        },
                        descripcion: "Envio de pin de recuperación de contraseña al correo electrónico."
                    },
                    {
                        ruta: "/api/autenticacion/recuperarcontrasena",
                        metodo: "put",
                        parametros: {
                            usuario: "login o correo del usuario. Obligatorio.",
                            pin: "Pin enviado al correo del usuario. Obligatorio.",
                            contrasena: "Nueva contrasena de usuario. Obligatorio.",
                        },
                        descripcion: "Actualiza la contraseña del usuario"
                    },
                    {
                        ruta: "/api/autenticacion/iniciosesion",
                        metodo: "post",
                        parametros:
                        {
                            usuario: "Login o correo de usuario. Obligatorio",
                            contrasena: "Contraseña del usuario. Obligatorio.",
                        },
                        descripcion: "Genera el token para poder acceder a las rutas del usuario"
                    },
                ],
            }
        ];
    const datos = {
        api: "API-SIGMER",
        descripcion: "Interfaz de progamación para el sistema de gestión de menus para restaurantes",
        propiedad: "DESOFIW",
        desarrollador: "Grupo #6",
        colaboradores: "",
        fecha: "31/10/2022",
        listaModulos
    };
    MSJ("Peticion ejecutada correctamente", datos, res);
};


exports.PinCorreo = async (req, res) => {

    const { login } = req.query;
 
    var errores = validacion(req);
    console.log(errores);
    if (errores.length>0) {
        MSJ(exito, errores, res);
    }
    else {

        var buscarUsuario = await Usuario.findOne({
            where: {
                login: login
            }
        });

        if (!buscarUsuario) {
            errores = [
                {
                    mensaje: "El usuario no existe",
                    parametro: "login"
                },
            ];
            MSJ(exito, errores, res);
        }
        else {
            const pin = gpc(4);
            const data = {
                correo: buscarUsuario.correo,
                pin: pin
            };
            
            if ( await EnviarCorreo.EnviarCorreo(data)){
                buscarUsuario.codigo = pin;
                await buscarUsuario.save();
                MSJ(exito,"Se Envio El Correo Con Exito!", res);
            }
            else{
                errores = [
                    {
                        mensaje: "Error al enviar el correo",
                        parametro: "correo"
                    }
                ];
                MSJ(exito, errores, res);
            }
           
        }
    }
};


exports.Recuperar = async (req, res) => {
    var msj = validacion(req);
    console.log(msj);
    if (msj.length>0) {
        MSJ(exito, msj, res);
    }
    else {
        const usuario = req.query.usuario;
        const { pin, contrasena } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where: {
                                    
                    login: usuario                
            }
        });
        
        if (!buscarUsuario) {
            var errores = [
                {
                    mensaje: "El  login no existe",
                    parametro: "usuario"
                },
            ];
            MSJ(exito, errores, res);
        }
        else {
            if (pin != buscarUsuario.codigo) {
               var errores = [
                    {
                        mensaje: "El pin es incorrecto o ha expirado",
                        parametro: "pin"
                    },
                ];
                MSJ(exito,errores, res);
            }
            else {
                const hash = bcrypt.hashSync(contrasena, 10);
                buscarUsuario.clave = hash;               
                buscarUsuario.estado = 'AC';
                buscarUsuario.fallidos = 0;
                buscarUsuario.codigo = '0000';
                await buscarUsuario.save()
                    .then((data) => {
                        
                        MSJ(exito, data, res);
                    })
                    .catch((error) => {
                        MSJ(exito,  error, res);
                    });
            }
        }
    }
};

exports.Error = async (req, res) => {
    var errores = [
        {
            mensaje: "Debe enviar las credenciales correctas",
            parametro: "autenticacion"
        },
    ];
    MSJ("Peticion ejecutada correctamente", errores, res);
};

exports.InicioSesion = async (req, res) => {
    var msj = validacion(req);
    if (msj.length>0) {
        MSJ("Peticion ejecutada correctamente",msj, res);
    }
    else {
        try {
            const { usuario, pass } = req.body;
            var buscarUsuario = await Usuario.findOne({
               
                where: {
                    [Op.or]: {
                        login: usuario,
                        correo: usuario,
                    },
                    estado: 'AC',
                }
            });
            if (!buscarUsuario) {
                var errores = [
                    {
                        mensaje: "El usuario no existe o se encuentra bloqueado",
                        parametro: "usuario"
                    },
                ];
                MSJ("Peticion ejecutada correctamente", errores, res);
            }
            else {
                if (buscarUsuario.VerificarContrasena(pass, buscarUsuario.clave)) {
                    const token = passport.getToken({ id: buscarUsuario.id });
                    
                    const data = {
                        token: token,
                        usuario: {                       
                            nombre:buscarUsuario.nombre ,                
                            correo: buscarUsuario.correo,
                            login: buscarUsuario.login,
                            imagen:buscarUsuario.imagen,
                            telefono:buscarUsuario.telefono,
                            dni:buscarUsuario.dni,
                            direccion:buscarUsuario.direccion,
                            id:buscarUsuario.id
                        }
                    };
                    MSJ("Peticion ejecutada correctamente", data, res);
                }
                else {
                    var errores = [
                        {
                            mensaje: "El usuario no existe o la contraseña es incorrecta",
                            parametro: "contrasena"
                        },
                    ];
                    buscarUsuario.fallidos = buscarUsuario.fallidos + 1;
                    await buscarUsuario.save()
                    .then((data)=>{
                        console.log(data);
                    }).catch((er)=>{
                        console.log(er);
                        errores=er;
                    });
                    MSJ("Peticion ejecutada correctamente",errores, res);
                }
            }
        } catch (error) {
            console.log(error);
           errores = "Error al conectar con la base de datos";
            MSJ("Error al Ejecutar la Peticion",errores, res);
        }

    }
};