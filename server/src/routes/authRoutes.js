const { Router } = require('express');
const { body } = require('express-validator');
const { login } = require('../controllers/authController');
const { validate } = require('../utils/validator');

const router = Router();

router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Tên đăng nhập không được để trống'),
    body('password').notEmpty().withMessage('Mật khẩu không được để trống')
  ],
  validate,
  login
);

module.exports = router;

