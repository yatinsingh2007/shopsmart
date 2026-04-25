const prisma = require('../models/prisma');

const getDashboardMetrics = async () => {
  const totalUsers = await prisma.user.count({
    where: { role: 'USER' }
  });

  const totalOrders = await prisma.order.count();

  const revenueResult = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { status: { not: 'CANCELLED' } }
  });

  const totalProducts = await prisma.product.count();

  return {
    totalUsers,
    totalOrders,
    totalRevenue: revenueResult._sum.totalAmount || 0,
    totalProducts
  };
};

const getAllUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: Number(limit),
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.user.count()
  ]);

  return {
    users,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page)
  };
};

const getAllOrders = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take: Number(limit),
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.order.count()
  ]);

  return {
    orders,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page)
  };
};

const updateOrderStatus = async (orderId, status) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};

module.exports = {
  getDashboardMetrics,
  getAllUsers,
  getAllOrders,
  updateOrderStatus
};
