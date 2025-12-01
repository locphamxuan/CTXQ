const { validationResult } = require('express-validator');
const { error } = require('./response');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return error(
    res,
    'Thông tin chưa hợp lệ',
    422,
    errors.array().map((entry) => ({
      field: entry.param,
      message: entry.msg
    }))
  );
}

module.exports = { validate };

