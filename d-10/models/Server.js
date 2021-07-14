const express = require('express')
var  handlebars  = require('express-handlebars');
require('dotenv').config()

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.productPath = '/api/productos'

        this.applyMiddleware()
        this.routes()
        this.hsb()
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

    //handlebars

    hsb(){
        this.app.engine(
            "hbs",
            handlebars({
                extname: ".hbs",
                defaultLayout: 'index.hbs',
            })
        );
        this.app.set("view engine", "hbs");
        this.app.set("views", "./views");
      
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