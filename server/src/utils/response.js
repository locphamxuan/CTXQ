function success(res, data = {}, status = 200) {
  return res.status(status).json({ success: true, data });
}

function error(res, message, status = 500, details) {
  return res.status(status).json({
    success: false,
    message,
    details
  });
}

module.exports = { success, error };

