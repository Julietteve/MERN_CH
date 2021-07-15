const { readFile } = require('fs/promises');
const { writeFile } = require('fs/promises');
const getLenArr = require('../utils/index')

const getProducts = async (req,res)=>{

    try{
        const data = await readFile('db/products.txt', 'utf-8')
        const parsedData = JSON.parse(data)

        if(parsedData.length>0){
            res.render('productos', {vista:`Vista de productos`, data : {parsedData}, port: process.env.PORT})
        }
        else{
            res.render('sin-productos', {vista: 'Vista de productos', error : "No se encontraron productos"})
        }
    }
    catch(err){
        console.log(err)
    }
    
}

const getProduct =async(req, res)=>{

    try{
        const id = req.params.id
        const data = await readFile('db/products.txt', 'utf-8')
        const parsedProducts = JSON.parse(data)
        const parsedData = parsedProducts.filter(product => product.id == id)

        if(parsedData.length>0){
            res.render('productos', {vista:`Vista de producto id ${id}`, data : {parsedData}, port: process.env.PORT})
            console.log(parsedData)
        }else{
            res.render('sin-productos',{vista: 'Vista de producto', error : 'Producto no encontrado'})
        }
    }
    catch(err){
        console.log(err)
    }
}



const postProduct = async (req,res)=>{
    const {title,price,thumbnail} = req.body
    const response = {
        title,
        price,
        thumbnail,
        id: await getLenArr()
    }
 
   res.redirect('/api/productos/nuevo-producto')

    try{
        const data = await readFile('db/products.txt', 'utf-8')
        const parsedProducts = JSON.parse(data)
        parsedProducts.push(response)
        await writeFile('db/products.txt', JSON.stringify(parsedProducts, null, '\t')) 
    }catch(err){
        console.log(err)
    }
}

const putProduct = async (req,res) => {
    const id = req.params.id
    const {title,price,thumbnail} = req.body
    
    const response = {
        title,
        price,
        thumbnail,
        id: parseInt(id)
    }

    try{
        const data = await readFile('db/products.txt', 'utf-8')
        const parsedProducts = JSON.parse(data)
        const index = parsedProducts.findIndex(product => product.id == id)

        parsedProducts[index] = response

        await writeFile('db/products.txt', JSON.stringify(parsedProducts, null, '\t')) 
        
            if(id != null){
                res.send({
                    msg: ` Producto conn id ${id} actualizado`,
                    data : response
                })
            }
            else{
                res.send({error : 'producto no encontrado'})
            }

    }
    catch(err){
        console.log(err)
    }


}

const deleteProduct = async (req,res) => {

    const id = req.params.id

    try{
        const data = await readFile('db/products.txt', 'utf-8')
        const parsedProducts = JSON.parse(data)
        const index = parsedProducts.findIndex(product => product.id == id)
        const deleted = parsedProducts.filter(item => item.id != id)

        await writeFile('db/products.txt', JSON.stringify(deleted, null, '\t')) 
        
            if(id != null){
                res.send({
                    msg: ` Producto ID:${id} eliminado`,
                    data : parsedProducts[index]
                })
            }
            else{
                res.send({error : 'producto no encontrado'})
            }

    }
    catch(err){
        console.log(err)
    }
}

const formNewProduct = (req,res) => {
        res.render('form-nuevo-producto',{vista:'Ingrese producto', port: process.env.PORT})
}

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
    formNewProduct
}