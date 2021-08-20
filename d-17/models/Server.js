const express = require('express')
var  handlebars  = require('express-handlebars');
const File = require('./File');
const Mensaje = require('../db_Model/dao/mensaje')
require('dotenv').config()

const archivo = new File()
const message = new Mensaje()

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

    sockets() {
        
        this.io.on('connection', async (socket) => {
            console.log('Cliente conectado')

            //Productos
            socket.emit('productos', listaProductos)

            socket.on('boton', (data) => {

            listaProductos.push(data);
              this.io.sockets.emit('productos', listaProductos)
              
            })

            //Chat
            socket.emit('messages', await message.list())
            
            let m = await message.list()
            console.log(m)
            socket.on('new-message', async (data) => {
            const newMsg = {
                author: data.author,
                text: data.text
            };
            newMsg.date = new Date().toLocaleString()
            await message.insert(newMsg)
              this.io.sockets.emit('messages', await message.list())
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