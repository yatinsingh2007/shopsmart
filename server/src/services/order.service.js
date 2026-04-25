const prisma = require('../lib/prisma');

const createOrder = async (userId, data) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  });

  if (!cart || cart.items.length === 0) {
    const error = new Error('Cart is empty');
    error.statusCode = 400;
    throw error;
  }

  let totalAmount = 0;
  const orderItemsData = cart.items.map(item => {
    totalAmount += item.quantity * item.product.price;
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price
    };
  });

  const order = await prisma.$transaction(async (tx) => {
    // Create order
    const newOrder = await tx.order.create({
      data: {
        userId,
        totalAmount,
        shippingAddress: data.shippingAddress,
        items: {
          create: orderItemsData
        }
      },
      include: { items: true }
    });

    // Update product stock
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
         throw new Error(`Insufficient stock for product ${item.product.name}`);
      }
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: item.product.stock - item.quantity }
      });
    }

    // Clear cart
    await tx.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return newOrder;
  });

  return order;
};

const getUserOrders = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });
};

const getOrderById = async (userId, orderId) => {
  return prisma.order.findFirst({
    where: { id: parseInt(orderId), userId },
    include: { items: { include: { product: true } } }
  });
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById
};
