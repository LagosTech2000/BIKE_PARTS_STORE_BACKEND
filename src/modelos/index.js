const usuario = require('./usuario')
const venta = require('./venta')
const ventaD = require('./ventaDetalle')
const articulo = require('./articulo')
const categoria = require('./categoria')
const ingreso = require('./ingreso')
const ingresoD = require('./ingresoDetalle')
const cliente = require('./cliente')
const proveedor = require('./proveedor')
const pedido = require('./pedido')
const descproveedor = require("./descarteprove")
const descarteArt = require('./descarteArticulo')
const detallePed = require('./detallePedido')
const descarteCliente = require('./descarteCliente')
const metodopago = require('./metodoPago')
const descarteUsuario = require('./descarteUsuario')
const comentario = require('./comentarios')
const factura = require("./pago")

exports.crearModelos= async()=>{
  ventaD.belongsTo(venta)  
  ventaD.belongsTo(ingresoD)  
  cliente.hasMany(venta)
  usuario.hasMany(venta)
  usuario.hasMany(ingreso)
  usuario.hasMany(comentario)
  comentario.belongsTo(usuario)
  ingresoD.belongsTo(ingreso)
  ingresoD.belongsTo(articulo)    
  articulo.belongsTo(categoria) 
  ingreso.belongsTo(proveedor)
  usuario.hasMany(factura)      
  detallePed.belongsTo(pedido)
  detallePed.belongsTo(articulo)
  proveedor.belongsTo(ingreso)

  
  await usuario.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo usuarios')
   }) 

   await cliente.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo clientes')
   }) 
   await detallePed.sync()
   .then(()=>console.log('Modelo metodo de detalle de pedidos Creado Correctamente'))

   .catch((error)=>{
    console.log('Error al crear el modelo detalle de pedidos')
   }) 

   await proveedor.sync().then()
   
   .catch((error)=>{
    console.log('Error al crear el modelo proveedor')
   }) 

   await articulo.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo articulo')
   }) 

   await descproveedor.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo descarte de proveedor')
   }) 
  
   await venta.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo venta')
   }) 

   await categoria.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo categoria')
   })  
 
    
   await ingreso.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo ingreso')
   }) 

   await ingresoD.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo ingresoD')
   })    

   await ventaD.sync()
   .then()

   .catch((error)=>{
    console.log('Error al crear el modelo ventasD')
   }) 

   await factura.sync()
   .then(()=>console.log('Modelo Creado Correctamente'))

   .catch((error) => {
    console.log("Error al crear el Modelo de Pago")
   })

   await metodopago.sync()
   .then(()=>console.log('Modelo Creado Correctamente'))

   .catch((error) => {
    console.log("Error al crear el Modelo de Metodo Pago")
   })

      await descarteArt.sync()
   .then(()=>console.log('Modelo metodo de descarte de articulos Creado Correctamente'))

   .catch((error)=>{
    console.log('Error al crear el modelo descarte de articulos')
   }) 

   await descarteUsuario.sync()
   .then()
      
   .catch((error)=>{
    console.log('Error al crear el modelo descarte de articulos')
   }) 
 
   await detallePed.sync()
   .then()

   .catch((error)=>{
    console.log('Error al crear el modelo detalle de pedidos')
   }) 

   await descarteCliente.sync()
   .then(()=>console.log('Modelo metodo de descarte de Clientes Creado Correctamente'))

   .catch((error)=>{
    console.log('Error al crear el modelo descarte de clientes')
   }) 

   await pedido.sync()
   .then()
   .catch((error) => {
    console.log("Error al crear el Modelo de Pago")
   })

   await comentario.sync()
   .then(()=>console.log('Modelo Creado Correctamente'))

   .catch((error) => {
    console.log("Error al crear el Modelo de Comentario")
   })
   
  
}


