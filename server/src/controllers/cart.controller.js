const cartService = require('../services/cart.service');

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const addItemToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const item = await cartService.addItemToCart(req.user.id, productId, quantity);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const item = await cartService.updateCartItem(req.user.id, req.params.itemId, quantity);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    await cartService.removeCartItem(req.user.id, req.params.itemId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem
};
