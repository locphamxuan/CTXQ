const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, query } = require('../services/db');
const { success, error } = require('../utils/response');

const SALT_ROUNDS = 10;

async function register(req, res) {
  const { username, phone, address, password } = req.body;

  try {
    console.log('=== REGISTER REQUEST ===');
    console.log('Body received:', { 
      username, 
      phone, 
      address, 
      passwordLength: password?.length,
      hasConfirmPassword: !!req.body.confirmPassword
    });

    // Kiểm tra user đã tồn tại - kiểm tra riêng từng trường để hiển thị lỗi cụ thể
    const existingUsername = await query(
      'SELECT TOP 1 id, username FROM Users WHERE username = @username',
      [
        { name: 'username', type: sql.NVarChar, value: username }
      ]
    );

    const existingPhone = await query(
      'SELECT TOP 1 id, phone FROM Users WHERE phone = @phone',
      [
        { name: 'phone', type: sql.NVarChar, value: phone }
      ]
    );

    // Tạo danh sách lỗi chi tiết
    const duplicateErrors = [];
    
    if (existingUsername && existingUsername.length > 0) {
      duplicateErrors.push({
        field: 'username',
        message: 'Tên đăng nhập này đã được sử dụng. Vui lòng chọn tên khác.'
      });
    }
    
    if (existingPhone && existingPhone.length > 0) {
      duplicateErrors.push({
        field: 'phone',
        message: 'Số điện thoại này đã được đăng ký. Vui lòng sử dụng số điện thoại khác.'
      });
    }

    if (duplicateErrors.length > 0) {
      console.log('Duplicate user information found:', duplicateErrors);
      return error(
        res,
        'Thông tin đã tồn tại trong hệ thống',
        409,
        duplicateErrors
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    console.log('Password hashed successfully');

    // Insert user vào database
    await query(
      `INSERT INTO Users (username, phone, address, passwordHash)
       VALUES (@username, @phone, @address, @passwordHash)`,
      [
        { name: 'username', type: sql.NVarChar, value: username },
        { name: 'phone', type: sql.NVarChar, value: phone },
        { name: 'address', type: sql.NVarChar, value: address },
        { name: 'passwordHash', type: sql.NVarChar, value: passwordHash }
      ]
    );

    console.log('User inserted, fetching created user...');

    // Lấy lại user vừa tạo
    const rows = await query(
      'SELECT TOP 1 id, username, phone, address, createdAt FROM Users WHERE username = @username',
      [{ name: 'username', type: sql.NVarChar, value: username }]
    );

    if (!rows || rows.length === 0) {
      console.error('Insert succeeded but user not found');
      return error(res, 'Không thể tạo tài khoản, vui lòng thử lại.', 500);
    }

    const user = rows[0];
    console.log('User created successfully:', { id: user.id, username: user.username });

    const token = signToken(user);

    return success(
      res,
      {
        token,
        user: {
          id: user.id,
          username: user.username,
          phone: user.phone,
          address: user.address,
          createdAt: user.createdAt
        }
      },
      201
    );
  } catch (err) {
    console.error('Register error:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    return error(res, 'Đăng ký thất bại, vui lòng thử lại sau.', 500, err.message);
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const rows = await query(
      'SELECT TOP 1 id, username, phone, address, passwordHash, createdAt, isAdmin FROM Users WHERE username = @username',
      [{ name: 'username', type: sql.NVarChar, value: username }]
    );

    if (!rows.length) {
      return error(res, 'Sai tên đăng nhập hoặc mật khẩu', 401);
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return error(res, 'Sai tên đăng nhập hoặc mật khẩu', 401);
    }

    // Xử lý isAdmin từ SQL Server BIT (có thể là true/false, 0/1, hoặc null)
    const isAdmin = user.isAdmin === true || user.isAdmin === 1 || user.isAdmin === '1';
    console.log('Login - User isAdmin:', { 
      raw: user.isAdmin, 
      type: typeof user.isAdmin, 
      processed: isAdmin 
    });

    const token = signToken({ ...user, isAdmin });

    return success(res, {
      token,
      user: {
        id: user.id,
        username: user.username,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt,
        isAdmin
      }
    });
  } catch (err) {
    return error(res, 'Đăng nhập thất bại, vui lòng thử lại sau.', 500, err.message);
  }
}

function signToken(user) {
  const secret = process.env.JWT_SECRET || 'DEV_ONLY_CHANGE_ME';
  const isAdmin = user.isAdmin === true || user.isAdmin === 1 || user.isAdmin === '1';
  return jwt.sign(
    { 
      sub: user.id, 
      username: user.username,
      isAdmin
    },
    secret,
    { expiresIn: '12h' }
  );
}

module.exports = {
  register,
  login
};


