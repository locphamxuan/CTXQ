const jwt = require('jsonwebtoken');
const { query } = require('../services/db');

// Verify JWT token
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Không có token xác thực'
    });
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn'
    });
  }
}

// Get client IP address
function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress ||
         'unknown';
}

// Check if IP is whitelisted (optional - only if ADMIN_IP_WHITELIST is set)
function checkIpWhitelist(req) {
  const whitelist = process.env.ADMIN_IP_WHITELIST;
  if (!whitelist) {
    // If no whitelist is set, allow all IPs (backward compatible)
    return true;
  }

  const allowedIps = whitelist.split(',').map(ip => ip.trim());
  const clientIp = getClientIp(req);
  
  // Check if client IP is in whitelist
  const isAllowed = allowedIps.some(ip => {
    // Support exact match or CIDR notation
    if (ip === clientIp) return true;
    // Simple check for IP range (you can enhance this)
    return clientIp.startsWith(ip.split('/')[0]);
  });

  return isAllowed;
}

// Check if user is admin
async function requireAdmin(req, res, next) {
  try {
    // Check IP whitelist if configured
    if (!checkIpWhitelist(req)) {
      console.warn(`Admin access denied for IP: ${getClientIp(req)}`);
      return res.status(403).json({
        success: false,
        message: 'Truy cập bị từ chối từ địa chỉ IP này'
      });
    }

    const userId = req.user.id;
    const users = await query(
      `SELECT isAdmin FROM Users WHERE id = @id`,
      [{ name: 'id', type: require('mssql').Int, value: userId }]
    );

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    const user = users[0];
    const isAdmin = user.isAdmin === true || user.isAdmin === 1 || 
                   (Buffer.isBuffer(user.isAdmin) && user.isAdmin[0] === 1);

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền truy cập'
      });
    }

    next();
  } catch (err) {
    console.error('Require admin error:', err);
    return res.status(500).json({
      success: false,
      message: 'Lỗi kiểm tra quyền truy cập'
    });
  }
}

module.exports = { authenticate, requireAdmin, getClientIp };

