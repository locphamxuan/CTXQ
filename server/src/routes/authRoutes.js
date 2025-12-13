const { Router } = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const { validate } = require('../utils/validator');

const router = Router();

router.post(
  '/register',
  [
    body('username')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Tên đăng nhập cần từ 3–50 ký tự'),
    body('phone')
      .trim()
      .matches(/^(0[0-9]{9}|\+84[0-9]{9})$/)
      .withMessage('Số điện thoại không hợp lệ (ví dụ: 0862317046 hoặc +84862317046)'),
    body('address')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Địa chỉ cần ít nhất 3 ký tự'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Mật khẩu cần ít nhất 6 ký tự')
      .matches(/^(?=.*[A-Za-z])(?=.*[0-9])/)
      .withMessage('Mật khẩu cần ít nhất 1 chữ cái và 1 chữ số'),
    body('confirmPassword')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Xác nhận mật khẩu không khớp')
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('Vui lòng nhập tên đăng nhập'),
    body('password').notEmpty().withMessage('Vui lòng nhập mật khẩu')
  ],
  validate,
  login
);

module.exports = router;


