const socket = io();

function pickForm() {
    const producto = {
        title: document.getElementById('input-title').value,
        price: document.getElementById('input-price').value,
        thumbnail: document.getElementById('input-thumbnail').value
      };
      
      socket.emit('boton', producto);

      document.getElementById('input-title').value = ''
      document.getElementById('input-price').value = ''
      document.getElementById('input-thumbnail').value = ''
      
    return false;
}

const inicioStrTable = `
    <div class="box-container">
        <div class="products-container" >
            <div class="table-responsive">
                <table class="table table-dark">
                        <thead>
                            <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Foto</th>
                            </tr>
                        </thead>
                    <tbody>`
const prodStrTemplate = `
                        <tr>
                            <td>{{title}}</td>
                            <td>{{price}}</td>
                            <td>
                                <img class="img-thumbnail" width="60" src={{{thumbnail}}} alt="not found" />
                            </td>
                        </tr>`;
const finStrTable = `
                    </tbody>
                </table>
            </div>
        </div>
    </div>`

const productoTemplate = Handlebars.compile(prodStrTemplate);

socket.on('productos', data => {
    const productosHtml = []
    if (data.length > 0) {
        for (const { title, price, thumbnail } of data) {
            const listProducts = productoTemplate( {title, price, thumbnail} );
            productosHtml.push(listProducts);
        }
        const listProducts = inicioStrTable +
                        `<ul>${productosHtml.join('')}</ul>` +
                        finStrTable;
        document.getElementById('productos').innerHTML = listProducts;
    }
    else{
        document.getElementById('productos').innerHTML = 
        `
        <div class="box-container">
            <div class="alert alert-warning" role="alert">
                No hay productos para mostrar
            </div>
        </div>     
      `;
    }
})

socket.on('messages', data => {
    mapData (data)
})

const mapData = (data) => {

    const messages = data.map( message => {
        return (
        `
        <div class="box-container-msg">
            <div class="date">
                <strong class="author" >${message.author}</strong>
                    [(${message.date})]:
                <em class="message">${message.text}</em> 
            </div>
        </div>
        `
        )
    }).join(" ")

    document.getElementById('messages').innerHTML = messages;
}

function addMessage() {

    const mensaje = {
      author: document.getElementById('username').value,
      text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
}
