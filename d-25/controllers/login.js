this.nombre = '';

function showSession(req) {
    console.log('------------ req.session -------------')
    console.log(req.session)

    console.log('----------- req.sessionID ------------')
    console.log(req.sessionID)

    console.log('----------- req.cookies ------------')
    console.log(req.cookies)

    console.log('---------- req.sessionStore ----------')
    console.log(req.sessionStore)
}


const login = (req,res) => {
    res.render('login')
}

let counter = 0

const getSessionOut = (req,res) => {
    res.json({ counter: ++counter })

}

const postSession = (req,res) => {
    const data = req.body;
     showSession(req)
    
    if (!req.session.counter) {

        req.session.inputUser = data.inputUser;
        this.nombre = data.inputUser;
        res.redirect('http://localhost:8080/api/productos');
        
    } else {
        req.session.counter++
        res.send(`Ud ha visitado el sitio ${req.session.counter} veces.`)
    }
    
}

const logout = (req,res) => {
    const nombre = this.nombre;
    req.session.destroy(err => {
      if (err) {
        res.json({ status: 'Logout ERROR', body: err })
      } else {
          res.render('despedida', {usuario:nombre})
      }
    })
}


module.exports = {
    logout,
    login,
    postSession,
    getSessionOut
}