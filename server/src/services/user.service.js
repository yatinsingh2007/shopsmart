const prisma = require('../lib/prisma');

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
};

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
