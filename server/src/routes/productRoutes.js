const { Router } = require('express');
const { body } = require('express-validator');
const { listProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { validate } = require('../utils/validator');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Products route is working!' });
});

// Public routes - get products
router.get('/', listProducts);
router.get('/:id', getProduct);

// Admin routes - CRUD products (require authentication)
router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('name').notEmpty().withMessage('Tên sản phẩm không được để trống'),
    body('price')
      .custom((value) => {
        const num = typeof value === 'string' ? parseFloat(value) : Number(value);
        return !isNaN(num) && num > 0;
      })
      .withMessage('Giá sản phẩm không hợp lệ'),
    body('category').notEmpty().withMessage('Danh mục sản phẩm không được để trống'),
    body('inventory')
      .optional()
      .custom((value) => {
        if (value === '' || value === null || value === undefined) return true;
        const num = typeof value === 'string' ? parseInt(value) : Number(value);
        return !isNaN(num) && num >= 0;
      })
      .withMessage('Số lượng tồn kho không hợp lệ')
  ],
  validate,
  createProduct
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  [
    body('name').notEmpty().withMessage('Tên sản phẩm không được để trống'),
    body('price')
      .custom((value) => {
        const num = typeof value === 'string' ? parseFloat(value) : Number(value);
        return !isNaN(num) && num > 0;
      })
      .withMessage('Giá sản phẩm không hợp lệ'),
    body('category').notEmpty().withMessage('Danh mục sản phẩm không được để trống'),
    body('inventory')
      .optional()
      .custom((value) => {
        if (value === '' || value === null || value === undefined) return true;
        const num = typeof value === 'string' ? parseInt(value) : Number(value);
        return !isNaN(num) && num >= 0;
      })
      .withMessage('Số lượng tồn kho không hợp lệ')
  ],
  validate,
  updateProduct
);

router.delete('/:id', authenticate, requireAdmin, deleteProduct);

module.exports = router;

