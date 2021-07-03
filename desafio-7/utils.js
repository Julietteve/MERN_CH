const { readFile } = require('fs/promises');

const getProducts = async () =>{

    const data = await readFile('./productos.txt', 'utf-8')
    const obj = Object.assign({},{item: JSON.parse(data)}, {cantidad:JSON.parse(data).length})

    return obj
}

const getRandom = async ()=> {

    const data = await readFile('./productos.txt', 'utf-8')
    const randomindex = Math.floor(Math.random() * JSON.parse(data).length)
    const obj = Object.assign({}, {item : JSON.parse(data)[randomindex]})

    return obj

}

module.exports = {
    getRandom,
    getProducts
}
