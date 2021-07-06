const {Router} = require('express')
const router = Router()

router.get('/',(req,res)=>{
    res.send('hiiiiii')
})


module.exports= router