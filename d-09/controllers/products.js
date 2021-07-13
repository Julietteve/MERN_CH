const { response } = require('express');
const { readFile } = require('fs/promises');
const { writeFile } = require('fs/promises');
const getLenArr = require('../utils/index')

const getProducts = async (req,res=response)=>{

    try{
        const data = await readFile('db/products.txt', 'utf-8')
        const parsedData = JSON.parse(data)

        if(parsedData.length>0){
            res.send(parsedData)
        }
        else{
            res.send({error : 'no hay productos cargados'})
        }
    }
    catch(err){
        console.log(err)
    }
    
}

const getProduct =async(req, res=response)=>{

    try{
        const id = req.params.id
        const data = await readFile('db/products.txt', 'utf-8')
        const parsedProducts = JSON.parse(data)
        const filteredById = parsedProducts.filter(product => product.id == id)

        if(filteredById.length>0){
            res.send(filteredById)
        }else{
            res.send({error : 'producto no encontrado'}
            )
        }
    }
    catch(err){
        console.log(err)
    }
}



const postProduct = async (req,res=response)=>{
    const {title,price,thumbnail} = req.body
    const response = {
        title,
        price,
        thumbnail,
        id: await getLenArr()
    }
 
    res.send(response)

    try{
        const data = await readFile('db/products.txt', 'utf-8')
        const parsedProducts = JSON.parse(data)
        parsedProducts.push(response)
        await writeFile('db/products.txt', JSON.stringify(parsedProducts, null, '\t')) 
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getProducts,
    getProduct,
    postProduct
}