-- Script tạo tài khoản admin
-- Tài khoản: admin123
-- Mật khẩu: Admin123

USE MultisectorHoldings;
GO

-- Bước 1: Thêm cột isAdmin nếu chưa có
IF NOT EXISTS (
    SELECT * FROM sys.columns 
    WHERE object_id = OBJECT_ID('dbo.Users') 
    AND name = 'isAdmin'
)
BEGIN
    ALTER TABLE Users
    ADD isAdmin BIT NOT NULL DEFAULT 0;
    PRINT 'Đã thêm cột isAdmin vào bảng Users';
END
ELSE
BEGIN
    PRINT 'Cột isAdmin đã tồn tại';
END
GO

-- Bước 2: Kiểm tra và tạo tài khoản admin
IF EXISTS (SELECT 1 FROM Users WHERE username = 'admin123')
BEGIN
    -- Nếu tài khoản đã tồn tại, cập nhật quyền admin
    UPDATE Users 
    SET isAdmin = 1 
    WHERE username = 'admin123';
    PRINT 'Đã cập nhật quyền admin cho tài khoản admin123';
END
ELSE
BEGIN
    -- Tạo tài khoản admin mới
    -- Hash của mật khẩu "Admin123" (bcrypt, salt rounds = 10)
    INSERT INTO Users (username, phone, address, passwordHash, isAdmin)
    VALUES (
        'admin123',
        '0862317046',  -- Số điện thoại, bạn có thể thay đổi
        'Admin Address',  -- Địa chỉ, bạn có thể thay đổi
        '$2b$10$adzPNkvvhUsQfjc.1RVK6.pjJT47.u9iKM7TJyAd0Ri9eFmlZ4w16',  -- Hash của "Admin123"
        1  -- isAdmin = true
    );
    PRINT 'Đã tạo tài khoản admin thành công!';
    PRINT 'Username: admin123';
    PRINT 'Password: Admin123';
END
GO

-- Kiểm tra kết quả
SELECT 
    id,
    username,
    phone,
    address,
    isAdmin,
    createdAt
FROM Users 
WHERE username = 'admin123';
GO

