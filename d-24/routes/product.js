const {Router} = require('express')
const router = Router()
const { getProduct, getProducts, postProduct, putProduct, deleteProduct, formNewProduct} = require('../controllers/products')


router.get('/', getProducts)

router.get('/nuevo-producto', formNewProduct)

router.get('/:id', getProduct)

router.post('/', postProduct)

router.put('/:id', putProduct)

router.delete('/:id', deleteProduct)

module.exports = router