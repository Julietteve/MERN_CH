const express = require('express')
const app = express()
const {getProducts,getRandom} = require('./utils')
 
const PORT = 8080

let counterItems=0;
let counterItem=0;


app.get('/items', async (req,res)=>{
    const data = await getProducts()
    counterItems++;
    res.send(data)
})

app.get('/item-random', async(req,res)=>{
    const data = await getRandom()
    counterItem++;
    res.send(data)
})

app.get('/visitas', (req, res)=>{
    const obj = Object.assign({},{visitas: {items :counterItems, item: counterItem}})
    res.send(obj)
})

app.get('*', (req, res)=>{
    res.send('404 | Ruta no encontrada')
})


const server = app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on( "error" , err => console.log(`Error en el servidor :  ${err}`))