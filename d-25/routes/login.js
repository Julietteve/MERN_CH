const {Router} = require('express')
const router = Router()
const { login, postSession, getSessionOut, logout } = require('../controllers/login')

router.get('/login', login)

router.post('/post-session', postSession)

router.get('/session-out', getSessionOut)

router.get('/logout',logout)



module.exports = router