const { readFile } = require('fs/promises');
const { writeFile } = require('fs/promises');
const { unlink } = require('fs/promises');

class Archivo{

    constructor(name){
        this.name = name
    }

    async leer(){
        try{
            const data = await readFile(this.name, 'utf-8')
            console.log(JSON.parse(data))
        }
        catch(err){
            if(err.code === 'ENOENT'){
                console.log('El archivo no existe')
                console.error(new Array)
            }
        }
    }

    async guardar(data){

        try{
            const arr = await readFile(this.name, 'utf-8')

            let parsed = JSON.parse(arr)
            data.id = parsed.length+1
            parsed.push(data)

            await writeFile(this.name, JSON.stringify(parsed, null, '\t'))
            
            console.log('Producto agregado')

        }
        catch(err){

            //Si el archivo no existe, crea un nuevo array de objetos con el nuevo producto ingresado

            if(err.code === 'ENOENT'){
                data.id = 1
                await writeFile(this.name, JSON.stringify([data], null, '\t'))
            }
            console.log('Colección creada')
        } 
           
    }

    async borrar(){
        try{
            await unlink(this.name);
            console.log(`${this.name} se elimino correctamente`)
        }
        catch(err){

            //Si el archivo ya fue eliminado
            
            if(err.code === 'ENOENT'){
                console.log(`${this.name} ya ha sido eliminado`)
            }
        }
    }

}

module.exports = Archivo