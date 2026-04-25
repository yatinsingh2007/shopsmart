const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

router.use(requireAuth);

router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);

module.exports = router;
