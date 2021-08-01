const express = require('express')
var  handlebars  = require('express-handlebars');
require('dotenv').config()

const listaProductos = []

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.productPath = '/api/productos'
        this.server = require('http').createServer( this.app )
        this.io = require('socket.io')( this.server )

        this.applyMiddleware()
        this.sockets()
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
        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/public/index.html')
          })
          
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

    //Sockets

    sockets(){
        this.io.on('connection', socket => {
            console.log('Cliente conectado')

            socket.emit('productos', listaProductos)

            socket.on('boton', (data) => {

              listaProductos.push(data);
              this.io.sockets.emit('productos', listaProductos)
              
            })
        })
    
    }

    //Open connection

    listen(){
        this.server.listen( this.port, ()=>{
            console.log(`Escuchando en puerto ${this.port}`)
        })
        this.server.on( "error" , err => console.log(`Error en el servidor :  ${err}`))
    }

}

module.exports= Server