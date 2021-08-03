
const { readFile, unlink, writeFile } = require('fs/promises');

class Archivo {
    constructor() {
        this.filepath = './db/messages.txt'
    }

    async read() {
        try {
            const messages = await readFile(this.filepath, 'utf-8')
            return JSON.parse(messages);
        } catch (err) {
            return [];
        }
  
    }

    async delete () {
        await unlink(this.filepath);
    }

    async save ( author , text) {
        try {
            let mensajes = await this.read()
            const nuevoMensaje = {
                author,
                text,
                id: mensajes.length + 1
            };
            nuevoMensaje.date = new Date().toLocaleString();
            mensajes.push(nuevoMensaje);
            await writeFile(this.filepath, JSON.stringify(mensajes, null, 2));
            return `Nuevo participante :  ${ author }`;
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = Archivo;