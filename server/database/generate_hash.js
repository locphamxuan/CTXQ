// Script để generate password hash và update vào SQL file
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const password = 'xuanloc123';
const saltRounds = 10;

async function generateHash() {
  try {
    console.log('Đang tạo password hash...');
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('\n✅ Password hash đã được tạo:');
    console.log(hash);
    console.log('\n📝 Đang cập nhật vào file SQL...');
    
    // Đọc file SQL
    const sqlPath = path.join(__dirname, 'update_admin_account.sql');
    let sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Thay thế placeholder
    sqlContent = sqlContent.replace('YOUR_PASSWORD_HASH_HERE', hash);
    
    // Ghi lại file
    fs.writeFileSync(sqlPath, sqlContent, 'utf8');
    
    console.log('✅ Đã cập nhật file update_admin_account.sql');
    console.log('\n📋 Bây giờ bạn có thể chạy file SQL trong SQL Server Management Studio:');
    console.log('   server/database/update_admin_account.sql');
    console.log('\n🔑 Thông tin đăng nhập:');
    console.log('   Username: xuanloc');
    console.log('   Password: xuanloc123');
    
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
}

generateHash();

