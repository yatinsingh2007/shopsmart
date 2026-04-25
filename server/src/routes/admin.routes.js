const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');

router.use(requireAuth);
router.use(requireRole(['ADMIN']));

router.get('/metrics', adminController.getDashboardMetrics);
router.get('/users', adminController.getAllUsers);
router.get('/orders', adminController.getAllOrders);
router.patch('/orders/:id/status', adminController.updateOrderStatus);

module.exports = router;
