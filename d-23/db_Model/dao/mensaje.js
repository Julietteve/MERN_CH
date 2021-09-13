const mongoose = require('mongoose');


const esquemaMensaje = new mongoose.Schema({
  id: { type: Number, require: true },
  author: { type: String, require: true, max: 1000 },
  text: { type: String, require: true, max: 1000 },
  date: { type: String, require: true, max: 1000 }
})
const daoMensajes = mongoose.model('mensajes', esquemaMensaje)

class ArchivoDB {
  constructor() {
    mongoose.connect(process.env.MONGO_DB,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }, (err) => {
      if (err) {
        console.log(err);
      }else{
        console.log('Conectado a la base');
      }
    })
  }

  crearTabla() {
    return daoMensajes.create({}, (err,res) => {
      if (err) {
        console.log(err);
      }else{
        console.log(res);
      }
    });
  }

  insert(mensaje) {
    return daoMensajes.create(mensaje, (err,res) => {
      if (err) {
        console.log(err);
      }else{
        // console.log(res);
      }
    });
  }

  list() {
    return daoMensajes.find({}, (err,res) => {
      if (err) {
        console.log(err)
      } else {
        // console.log(res)
      }
    });
  }
  cerrar() {
    mongoose.disconnect(err => { console.log('desconectado de la base') });
  }
}

module.exports = ArchivoDB;