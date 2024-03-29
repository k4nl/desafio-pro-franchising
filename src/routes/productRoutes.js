const express = require('express');

const router = express.Router();

const productControllers = require('../controllers/productControllers');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');

router.post('/', auth.ingredientRouteVerify, productControllers.createProduct);
router.put('/:id/image', auth.ingredientRouteVerify, upload, productControllers.uploadImage);
router.delete('/:id', auth.ingredientRouteVerify, productControllers.deleteProduct);
router.get('/:id', productControllers.findProductById);
router.get('/', productControllers.findAllProducts);


module.exports = router;