const express = require('express');
const app = express(); 
const errorMiddleware = require("./middleware/errors")
const cookieParser=require("cookie-parser")
const bodyParser = require('body-parser') //evaluar lo que consigo en el body 
const fileUpload = require('express-fileupload')
const path = require("path") 

//Seteamos archivo de configuracion
if(process.env.NODE_ENV!=="PRODUCTION") require('dotenv').config({path:'back/config/config.env'})

//Uso de constantes importadas
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());//Primero debe pasar por cookie parser para garantizar que no pasará a una ruta sin autorizacion

//importamos las rutas
const products = require('./routes/products'); //importamos el archivo de rutas de productos
const users= require ("./routes/auth")//Importamos rutas de auth
const ordenes = require('./routes/orders'); //importamos el archivo de rutas de ordenes

if(process.env.NODE_ENV === "PRODUCTION"){ //si estoy en producción
    app.use(express.static(path.join(__dirname,'../front/build')))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname,'../front/build/index.html')) //si no encuentra la ruta, va a la carpeta build y busca el index.html
    })
}

//creamos las rutas
app.use('/api', products); //creamos la ruta
app.use('/api', users); //creamos la ruta usuarios
app.use('/api', ordenes); //creamos la ruta de ordenes

//MidlleWares para manejar errores
app.use(errorMiddleware)

module.exports = app; //exportamos el modulo 

