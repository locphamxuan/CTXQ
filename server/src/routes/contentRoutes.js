const { Router } = require('express');
const { body } = require('express-validator');
const {
  getHome,
  getAbout,
  getDomains,
  getDomainById,
  getBlog,
  submitContact
} = require('../controllers/contentController');
const { validate } = require('../utils/validator');

const router = Router();

router.get('/home', getHome);
router.get('/about', getAbout);
router.get('/domains', getDomains);
router.get('/domains/:domainId', getDomainById);
router.get('/blog', getBlog);

router.post(
  '/contact',
  [
    body('fullName').trim().notEmpty().withMessage('Vui lòng nhập họ tên'),
    body('email')
      .isEmail()
      .withMessage('Email chưa đúng định dạng')
      .normalizeEmail(),
    body('phone')
      .optional()
      .isLength({ min: 9 })
      .withMessage('Số điện thoại chưa chính xác'),
    body('message')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Vui lòng mô tả nhu cầu chi tiết hơn')
  ],
  validate,
  submitContact
);

module.exports = router;

