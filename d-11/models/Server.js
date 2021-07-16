const express = require('express')
require('dotenv').config()

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.productPath = '/api/productos'

        this.applyMiddleware()
        this.routes()
        this.ejs()
    }

    //Middleware

    applyMiddleware(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
    } 

    //Routes

    routes(){
        this.app.use(this.productPath, require('../routes/product'))
    }

    //ejs

    ejs(){
        this.app.set('views', './views');
        this.app.set('view engine', 'ejs');
    }

    //Open connection

    listen(){
        this.app.listen( this.port, ()=>{
            console.log(`Escuchando en puerto ${this.port}`)
        })
        this.app.on( "error" , err => console.log(`Error en el servidor :  ${err}`))
    }

}

module.exports= Server