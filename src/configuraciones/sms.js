var TMClient = require('textmagic-rest-client');

exports.EnviarSMS= async(data)=>{

var c = new TMClient('username', 'C7XDKZOQZo6HvhJwtUw0MBcslfqwtp4');
c.Messages.send({text: 'Prueba de mensaje', phones:'+50487639939'}, function(err, res){
    console.log('Mensaje Enviado', err, res);

});

}