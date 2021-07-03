const express = require('express')
const app = express()
const {getItems,getRandomItem} = require('./utils')
 
const PORT = 8080

let counterItems=0;
let counterItem=0;


app.get('/items', async (req,res) => {
    const data = await getItems()
    counterItems++;
    res.send(data)
})

app.get('/item-random', async(req,res) => {
    const data = await getRandomItem()
    counterItem++;
    res.send(data)
})

app.get('/visitas', (req, res) => {
    const obj = Object.assign({},{visitas: {items :counterItems, item: counterItem}})
    res.send(obj)
})

app.get('*', (req, res) => {
    res.send( '404 | Ruta no encontrada');
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${server.address().port}`)
})
server.on( "error" , err => console.log(`Error en el servidor :  ${err}`))