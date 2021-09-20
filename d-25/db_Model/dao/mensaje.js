const mongoose = require('mongoose');
const { denormalize, normalize, schema } = require('normalizr');
require('dotenv').config()

const user = new schema.Entity("users");
// Define your text schema
const text = new schema.Entity("text");
// Define your mensaje
const mensaje = new schema.Entity("mensaje", {
  author: user,
  text: text,
});
const mensajes = new schema.Entity("mensajes", {
  mensajes: [mensaje],
});
//normalizaData
const esquemaMensaje = new mongoose.Schema({
  entities: {
    users: { 
      id: { type: String, require: true, max: 1000 },
      nombre: { type: String, require: true, max: 1000 },
      apellido: { type: String, require: true, max: 1000 },
      edad: { type: String, require: true, max: 1000 },
      alias: { type: String, require: true, max: 1000 },
      avatar: { type: String, require: true, max: 1000 },
     },
    text: { 
      id: { type: Number, require: true },
      text: { type: String, require: true, max: 1000 },
     },
    mensaje: { 
      id: { type: Number, require: true },
      author: { type: String, require: true, max: 1000 },
      text: { type: Number, require: true },
      date: { type: String, require: true, max: 1000 },
     },
    mensajes: { 
      id: { type: String, require: true, max: 1000 },
      mensajes: { type: Number, require: true },
     },
  },
  result: { type: String, require: true, max: 1000 },
})

const daoMensajes = mongoose.model('mensajes', esquemaMensaje)

class ArchivoDB {
  constructor() {
    mongoose.connect( process.env.MONGO_DB ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (err) => {
      if (err) {
        console.log(err);
      }else{
        console.log('Conectado desde archivoDb');
      }
    })
  }

  async insert(normalizedData) {
    const texts = normalizedData.entities.text;
    // console.log(texts);
    try{
      const msgs = await daoMensajes.create(normalizedData)
      return msgs
    }
    catch(err){
      console.log(err)
    }
  }

  async list() {
    try{
      const listing = await daoMensajes.find({}, (err,res) => {
        if (err) {
          console.log(err)
        } else {
          //console.log("/* -------------- NORMALIZED ------------- */");
          const normalizedData = res;
          //console.log(normalizedData);
  
          const denormalizedData = denormalize(
                normalizedData.result,
                mensajes,
                normalizedData.entities
          );
          //console.log("/* -------------- DENORMALIZED denormalizedData.mensajes ------------- */");
         // console.log(denormalizedData);
          
        }
      });
  
      return listing
    }
     catch(err){
      console.log(err)
    }
  }
 
  cerrar() {
    mongoose.disconnect(err => { console.log('Desconectado de la base') });
  }
}

module.exports = ArchivoDB;