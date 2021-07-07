const {Router} = require('express')
const router = Router()
const { getProduct, getProducts, postProduct} = require('../controllers/products')

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', postProduct)

module.exports= router