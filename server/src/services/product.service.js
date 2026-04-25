const prisma = require('../lib/prisma');

const getAllProducts = async (filters = {}) => {
  const { page = 1, limit = 10, search, categoryId } = filters;
  const skip = (page - 1) * limit;

  const where = {};
  if (search) {
    where.name = { contains: search, mode: 'insensitive' };
  }
  if (categoryId) {
    where.categoryId = parseInt(categoryId);
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: { category: true },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page: parseInt(page), limit: parseInt(limit) };
};

const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { category: true },
  });
};

const createProduct = async (data) => {
  return await prisma.product.create({ data });
};

const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
