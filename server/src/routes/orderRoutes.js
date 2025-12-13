const { Router } = require('express');
const { body } = require('express-validator');
const { createOrder } = require('../controllers/orderController');
const { validate } = require('../utils/validator');

const router = Router();

router.post(
  '/',
  [
    body('userId').isInt().withMessage('User ID không hợp lệ'),
    body('items').isArray({ min: 1 }).withMessage('Đơn hàng phải có ít nhất 1 sản phẩm'),
    body('items.*.productId').notEmpty().withMessage('Mã sản phẩm không được để trống'),
    body('items.*.productName').notEmpty().withMessage('Tên sản phẩm không được để trống'),
    body('items.*.price').isFloat({ min: 0 }).withMessage('Giá sản phẩm không hợp lệ'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Số lượng phải lớn hơn 0'),
    body('total').isFloat({ min: 0 }).withMessage('Tổng tiền không hợp lệ')
  ],
  validate,
  createOrder
);

module.exports = router;

