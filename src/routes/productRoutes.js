const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const upload = require('../middlewares/uploadMiddleware');

// Routes
router.post('/add', upload.array('images', 5), productController.addProduct);
router.get('/list', productController.getProducts); // Fetch products (optional filters: category, search)
router.delete('/:id', productController.deleteProduct); // Delete product by ID
router.put('/edit/:id', upload.array('images', 5), productController.editProduct);

module.exports = router;
