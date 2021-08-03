require('dotenv').config()

const express = require('express')
const handlebars  = require('express-handlebars');
const Archivo = require('./models/File');


const archivo = new Archivo()
const listaProductos = []
const app = express()
const port = process.env.PORT
const productPath = '/api/productos'
const server = require('http').createServer( app )
const io = require('socket.io')( server )

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
     
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.use( productPath, require('./routes/product'))
    
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
    );
app.set("view engine", "hbs");
app.set("views", "./views");

io.on('connection', async (socket) => {
    console.log('Cliente conectado')

    //Productos
    socket.emit('productos', listaProductos)

    socket.on('boton', (data) => {

    listaProductos.push(data);
       io.sockets.emit('productos', listaProductos)
              
    })

    //Chat
    socket.emit('messages', await archivo.read())

    socket.on('new-message', async (data) => {
          
    await archivo.save(data.author, data.text)
        io.sockets.emit('messages', await archivo.read())
    })
})

    //Open connection
server.listen( port, ()=>{
    console.log(`Escuchando en puerto ${port}`)
})
server.on( "error" , err => console.log(`Error en el servidor :  ${err}`))
