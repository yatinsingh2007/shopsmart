const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { cartItemSchema, updateCartItemSchema } = require('../utils/validations');

router.use(requireAuth);

router.get('/', cartController.getCart);
router.post('/', validate(cartItemSchema), cartController.addItemToCart);
router.put('/:itemId', validate(updateCartItemSchema), cartController.updateCartItem);
router.delete('/:itemId', cartController.removeCartItem);

module.exports = router;
