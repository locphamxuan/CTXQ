const { Router } = require('express');
const { body } = require('express-validator');
const {
  listUsers,
  listMoneySources,
  createMoneySource,
  updateMoneySource,
  deleteMoneySource,
  listCashFlows,
  createCashFlow,
  deleteCashFlow,
  getDailyReport
} = require('../controllers/adminController');
const { validate } = require('../utils/validator');

const router = Router();

// Users (read‑only list)
router.get('/users', listUsers);

// Money sources
router.get('/money-sources', listMoneySources);

router.post(
  '/money-sources',
  [body('name').trim().notEmpty().withMessage('Tên nguồn tiền không được để trống')],
  validate,
  createMoneySource
);

router.put(
  '/money-sources/:id',
  [body('name').trim().notEmpty().withMessage('Tên nguồn tiền không được để trống')],
  validate,
  updateMoneySource
);

router.delete('/money-sources/:id', deleteMoneySource);

// Cash flows
router.get('/cash-flows', listCashFlows);

router.post(
  '/cash-flows',
  [
    body('sourceId').isInt().withMessage('Nguồn tiền không hợp lệ'),
    body('amount').isFloat({ min: 0 }).withMessage('Số tiền không hợp lệ'),
    body('type').isIn(['IN', 'OUT']).withMessage('Loại dòng tiền không hợp lệ')
  ],
  validate,
  createCashFlow
);

router.delete('/cash-flows/:id', deleteCashFlow);

// Daily report
router.get('/report/daily', getDailyReport);

module.exports = router;


