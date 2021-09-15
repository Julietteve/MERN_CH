const express = require('express')
var  handlebars  = require('express-handlebars');
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()
const { denormalize, normalize, schema } = require('normalizr');

const ArchivoDB = require('../db_Model/dao/mensaje')

const message = new ArchivoDB()


const listaProductos = []

class Server {

    constructor(){

        this.app = express()
        this.port = process.env.PORT
        this.productPath = '/api/productos'
        this.loginPath = '/api'
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
        this.app.use(cookieParser());
        this.app.use(session({
            secret: 'secret',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 60000 }
        }));
    } 

    //Routes

    routes(){

        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/public/index.html')
          })
          
        this.app.use(this.productPath, require('../routes/product'))
        this.app.use(this.loginPath, require('../routes/login'))
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
    
        const user = new schema.Entity("users");

// Define your text schema
        const text = new schema.Entity("text");

// Define your mensaje
        const mensaje = new schema.Entity("mensaje", {
            author: user,
            text: text,
        });

        const mensajes = new schema.Entity("mensajes", {
            mensajes: [mensaje],
        });

        
        this.io.on('connection', async (socket) => {
            console.log('Cliente conectado')
            
            let listaMensajes = await message.list()

            //Productos
            socket.emit('productos', listaProductos)

            socket.on('boton', (data) => {

            listaProductos.push(data);
              this.io.sockets.emit('productos', listaProductos)
              
            })

            //Chat
            socket.emit('messages', listaMensajes)
        
            socket.on('new-message', async (data) => {
                const nuevoMensaje = {
                    id: listaMensajes.length+1,
                    author: {
                      id: data.author.id,
                      nombre: data.author.nombre,
                      apellido: data.author.apellido,
                      edad: data.author.edad,
                      alias: data.author.alias,
                      avatar: data.author.avatar
                    },
                    text: {
                      id: listaMensajes.length+1,
                      text: data.text,
                    },
                    date: new Date().toLocaleString()
                  };
                  // console.log(nuevoMensaje);
                  listaMensajes.push(nuevoMensaje)
                  // console.log(listaMensajes);
                  const originalData = {
                    id: "1",
                    mensajes: listaMensajes,
                  };
                  const normalizedData = normalize(originalData, mensajes);
                  
             await message.insert(normalizedData)
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