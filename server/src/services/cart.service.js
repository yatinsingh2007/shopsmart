const prisma = require('../lib/prisma');

const getCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
  }
  return cart;
};

const addItemToCart = async (userId, productId, quantity) => {
  const cart = await getCart(userId);

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      }
    }
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity
    }
  });
};

const updateCartItem = async (userId, itemId, quantity) => {
  if (quantity === 0) {
    return prisma.cartItem.delete({
      where: { id: parseInt(itemId) }
    });
  }

  return prisma.cartItem.update({
    where: { id: parseInt(itemId) },
    data: { quantity }
  });
};

const removeCartItem = async (userId, itemId) => {
  return prisma.cartItem.delete({
    where: { id: parseInt(itemId) }
  });
};

module.exports = {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem
};
