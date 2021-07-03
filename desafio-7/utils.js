const { readFile } = require('fs/promises');

const getItems = async () =>{

    const data = await readFile('./productos.txt', 'utf-8')
    const obj = Object.assign({},{item: JSON.parse(data)}, {cantidad:JSON.parse(data).length})

    return obj
}

const getRandomItem = async ()=> {

    const data = await readFile('./productos.txt', 'utf-8')
    const randomIndex = Math.floor(Math.random() * JSON.parse(data).length)
    const obj = Object.assign({}, {item : JSON.parse(data)[randomIndex]})

    return obj

}

module.exports = {
    getItems,
    getRandomItem
}
