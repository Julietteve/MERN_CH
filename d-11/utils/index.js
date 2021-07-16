const { readFile } = require('fs/promises');

const getLenArr = async () =>{
    try{
        const data = await readFile('db/products.txt', 'utf-8')
        const parsedProducts = JSON.parse(data)
    
        return parsedProducts.length + 1;

    }catch(err){
        console.log(err)
    }
}

module.exports = getLenArr