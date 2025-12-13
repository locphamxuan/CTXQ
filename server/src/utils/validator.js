const { validationResult } = require('express-validator');
const { error } = require('./response');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorDetails = errors.array().map((entry) => ({
    field: entry.param,
    message: entry.msg
  }));

  console.log('Validation errors:', errorDetails);

  return error(
    res,
    'Thông tin chưa hợp lệ',
    422,
    errorDetails
  );
}

module.exports = { validate };

