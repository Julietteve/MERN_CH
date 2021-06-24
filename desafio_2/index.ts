import {operaciones} from "./funciones";

const results = async ()  =>{
    
    const operacion = await operaciones();

    console.log('\x1b[36m%s\x1b[0m', `${operacion}`);
    
} 

results()