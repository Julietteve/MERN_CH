
import {Suma, Resta} from "./clases";

const operacion = (firstDigit:number, secondDigit:number, operation:string) => {

    let operation_lower : string = operation.toLowerCase();
    let result : number;

    return new Promise ((resolve) => {
    
        if( operation_lower === "suma" ){
    
            const suma = new Suma(firstDigit,secondDigit);
            result = suma.resultado();
        }
        else{
    
            const resta = new Resta(firstDigit,secondDigit);
            result = resta.resultado();

        }
    
        resolve(result)
    })

}


export const operaciones = async () =>{

    try{

        const suma = await operacion(140,65,'suma');
    
        const resta = await operacion(400,250,'resta');

        return `\nSuma : ${suma}\nResta : ${resta} `

    }catch (err)
    {
        console.log(err);
    }


}
