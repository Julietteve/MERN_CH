const db = require('../db/db')

class Mensaje {
    constructor(){}

    insert(mensaje){
        return db('mensajes').insert(mensaje)
    }

    list(){
        return db('mensajes').select()
    }

     deleteByID(id){
        return db('mensajes').where('id',id).deleteByID()
    }

    updateStockbyId(id, newText){
        return db('mensajes').from('id',id).update({text:newText})
    }
}

module.exports = Mensaje;