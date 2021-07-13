const express = require('express')
require('dotenv').config()

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.productPath = '/api/productos'

        this.applyMiddleware()
        this.routes()
    }

    //Middleware

    applyMiddleware(){
        this.app.use(express.json())
    } 

    //Routes

    routes(){
        this.app.use(this.productPath, require('../routes/product'))
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