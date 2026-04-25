const adminService = require('../services/admin.service');

const getDashboardMetrics = async (req, res, next) => {
  try {
    const metrics = await adminService.getDashboardMetrics();
    res.json(metrics);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const users = await adminService.getAllUsers(page, limit);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const orders = await adminService.getAllOrders(page, limit);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await adminService.updateOrderStatus(req.params.id, status);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardMetrics,
  getAllUsers,
  getAllOrders,
  updateOrderStatus
};
