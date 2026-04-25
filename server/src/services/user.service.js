const prisma = require('../lib/prisma');

const getAllUsers = async () => {
  return prisma.user.findMany();
};

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
};

const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
