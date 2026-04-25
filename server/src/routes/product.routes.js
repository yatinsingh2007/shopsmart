const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { productSchema } = require('../utils/validations');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin only routes
router.post('/', requireAuth, requireRole(['ADMIN']), validate(productSchema), productController.createProduct);
router.put('/:id', requireAuth, requireRole(['ADMIN']), validate(productSchema), productController.updateProduct);
router.delete('/:id', requireAuth, requireRole(['ADMIN']), productController.deleteProduct);

module.exports = router;
