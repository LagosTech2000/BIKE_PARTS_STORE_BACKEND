const express = require('express')
const morgan = require('morgan')
const path = require("path")
require("dotenv").config();
const db = require('./configuraciones/db')
const modelos = require('./modelos')

const app = express()
//The Protocol
app.set('port', 4005)
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//end of The Protocol
app.use('/api', require('./rutas/'))
app.use("/api/img", express.static(path.join(__dirname, "public/img")))

app.use('/api/articulos', require('./rutas/articulos'))
app.use('/api/usuarios', require('./rutas/usuarios'))
app.use('/api/proveedores', require('./rutas/proveedores')) 
app.use('/api/autenticacion', require('./rutas/autenticacion')) 
app.use('/api/ventas', require('./rutas/ventas'));
app.use('/api/facturas', require('./rutas/pagos'));
app.use('/api/pedidos', require('./rutas/pedidos'));
app.use('/api/ingresos', require('./rutas/ingresos')) 
app.use('/api/ingresodetalle', require('./rutas/ingresoDetalle')) 
app.use('/api/metodoPago', require('./rutas/metodoPago')) 
app.use('/api/categorias', require('./rutas/categorias'))
app.use('/api/descarteproveedores', require('./rutas/descarteproves'))
app.use('/api/ventadetalles', require('./rutas/ventadetalles'))
app.use('/api/descartearticulos', require('./rutas/descarteArticulo')) 
app.use('/api/detallepedidos', require('./rutas/detallePedido')) 
app.use('/api/descarteclientes', require('./rutas/descarteCliente')) 
app.use('/api/clientes', require('./rutas/clientes')) 
app.use('/api/descarteusuarios', require('./rutas/descarteUsuario')) 
app.use('/api/comentarios', require('./rutas/comentarios')) 
app.listen(app.get('port'), () => {
    console.log('Servidor Iniciado en el puerto ' + app.get('port'));
    db.authenticate().then(() => {
        console.log('Se ha establecido la conexion Con la base de datos!')
        modelos.crearModelos()
    })  

        .catch((error) => {
            console.log('Error al conectarse a la base de datos')   
        })

})

