const http = require('http');
require('dotenv').config()

const server = http.createServer((petition,res)=>{

   /*  Math.floor(Math.random() * (1 + High - Low)) + Low */
   
    let id = Math.floor(Math.random() * 10) + 1;
    let price = +(Math.random()* (999.99 - 0.00) + 0.00).toFixed(2)
    
    let data = {
        id: id,
        title: `Producto ${id}`,
        price: price,
        thumbnail: `Foto ${id}`,
    }

    res.end(JSON.stringify(data))
})

server.listen( process.env.PORT , ()=>{
    console.log("Server listening on port " +  process.env.PORT)
})