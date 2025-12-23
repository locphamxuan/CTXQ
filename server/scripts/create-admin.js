/**
 * Script để tạo tài khoản admin
 * Chạy: node server/scripts/create-admin.js
 */

require('dotenv').config({ path: '.env' });
const bcrypt = require('bcryptjs');
const { sql, query } = require('../src/services/db');

const SALT_ROUNDS = 10;

async function createAdmin() {
  const adminData = {
    username: 'admin123',
    password: 'Admin123',
    phone: '0862317046', // Số điện thoại mặc định, bạn có thể thay đổi
    address: 'Admin Address' // Địa chỉ mặc định, bạn có thể thay đổi
  };

  try {
    console.log('Đang kết nối database...');
    
    // Kiểm tra xem user đã tồn tại chưa
    const existing = await query(
      'SELECT TOP 1 id, username FROM Users WHERE username = @username',
      [{ name: 'username', type: sql.NVarChar, value: adminData.username }]
    );

    if (existing && existing.length > 0) {
      console.log('⚠️  Tài khoản admin đã tồn tại!');
      console.log('Đang cập nhật quyền admin...');
      
      // Cập nhật isAdmin = 1 cho tài khoản hiện có
      await query(
        'UPDATE Users SET isAdmin = 1 WHERE username = @username',
        [{ name: 'username', type: sql.NVarChar, value: adminData.username }]
      );
      
      console.log('✅ Đã cập nhật quyền admin cho tài khoản:', adminData.username);
      process.exit(0);
    }

    // Hash mật khẩu
    console.log('Đang hash mật khẩu...');
    const passwordHash = await bcrypt.hash(adminData.password, SALT_ROUNDS);

    // Kiểm tra xem cột isAdmin đã tồn tại chưa
    try {
      await query('SELECT isAdmin FROM Users WHERE 1=0', []);
    } catch (err) {
      if (err.message.includes('isAdmin')) {
        console.error('❌ Lỗi: Cột isAdmin chưa được thêm vào bảng Users!');
        console.log('Vui lòng chạy script SQL: server/database/add_admin_column.sql');
        process.exit(1);
      }
      throw err;
    }

    // Insert tài khoản admin
    console.log('Đang tạo tài khoản admin...');
    await query(
      `INSERT INTO Users (username, phone, address, passwordHash, isAdmin)
       VALUES (@username, @phone, @address, @passwordHash, @isAdmin)`,
      [
        { name: 'username', type: sql.NVarChar, value: adminData.username },
        { name: 'phone', type: sql.NVarChar, value: adminData.phone },
        { name: 'address', type: sql.NVarChar, value: adminData.address },
        { name: 'passwordHash', type: sql.NVarChar, value: passwordHash },
        { name: 'isAdmin', type: sql.Bit, value: true }
      ]
    );

    console.log('✅ Tạo tài khoản admin thành công!');
    console.log('📋 Thông tin đăng nhập:');
    console.log('   Username:', adminData.username);
    console.log('   Password:', adminData.password);
    console.log('   Phone:', adminData.phone);
    console.log('   Address:', adminData.address);
    console.log('   isAdmin: true');

    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi khi tạo tài khoản admin:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

createAdmin();

