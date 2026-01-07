const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, query } = require('../services/db');
const { success, error } = require('../utils/response');
const { getClientIp } = require('../middleware/auth');

// Login
async function login(req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return error(res, 'Tên đăng nhập và mật khẩu là bắt buộc', 400);
    }

    // Find user
    const users = await query(
      `SELECT id, username, phone, address, passwordHash, isAdmin
       FROM Users
       WHERE username = @username`,
      [{ name: 'username', type: sql.NVarChar, value: username }]
    );

    if (!users || users.length === 0) {
      return error(res, 'Tên đăng nhập hoặc mật khẩu không đúng', 401);
    }

    const user = users[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return error(res, 'Tên đăng nhập hoặc mật khẩu không đúng', 401);
    }

    // Check if admin
    const isAdmin = user.isAdmin === true || user.isAdmin === 1 || 
                   (Buffer.isBuffer(user.isAdmin) && user.isAdmin[0] === 1);

    if (!isAdmin) {
      return error(res, 'Bạn không có quyền truy cập admin', 403);
    }

    // IP whitelist check is disabled for login
    // (Only used in requireAdmin middleware for API routes)
    // If you need IP restriction for login, uncomment below:
    /*
    const whitelist = process.env.ADMIN_IP_WHITELIST;
    if (whitelist && whitelist.trim() !== '') {
      const allowedIps = whitelist.split(',').map(ip => ip.trim()).filter(ip => ip !== '');
      const clientIp = getClientIp(req);
      
      if (allowedIps.length > 0) {
        const isAllowed = allowedIps.some(ip => clientIp === ip || clientIp.startsWith(ip.split('/')[0]));
        
        if (!isAllowed) {
          console.warn(`Admin login denied for IP: ${clientIp}`);
          return error(res, 'Truy cập bị từ chối từ địa chỉ IP này', 403);
        }
      }
    }
    */

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: true },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    return success(res, {
      token,
      user: {
        id: user.id,
        username: user.username,
        phone: user.phone,
        address: user.address,
        isAdmin: true
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return error(res, 'Đăng nhập thất bại', 500, err.message);
  }
}

module.exports = { login };

