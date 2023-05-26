const nodemailer = require('nodemailer');
exports.EnviarCorreo = async (data) =>{

    const configurarCorreo = {
        from: process.env.APP_CORREO,
        to: data.correo,
        subject: 'Recuperación de contraseña MotoRepuestos',
        html: '<h1>Pin temporal: '+data.pin+' No Comparta Este Pin Con Nadie</h1>'
    };

    const transporte = nodemailer.createTransport({
        host: process.env.CORREO_SERVICIO,
        port: process.env.CORREO_PORT,
        secure: false,
        auth:{
            user: process.env.APP_USER,
            pass: process.env.APP_CONTRASENA,
        },
    });

    await transporte.verify(function (error, success) {
        if (error) {
            console.log(error);
            return false;
        }
        else {
            console.log(success);
            console.log('El servidor puede enviar correos');
        }
    });

    return await transporte.sendMail(configurarCorreo);
};
