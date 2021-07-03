const Archivo = require('./classes/Archivo.js')

const producto = new Archivo('./productos.txt')


/* 

-----------Casos de prueba-----------
-Descomentar para probar cada método- 


*/

producto.leer() 

/* producto.guardar(
    {
        title: 'Lápiz rojo',
        price: 33.00,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-128.png',
    }
)  */

/* producto.borrar() */

