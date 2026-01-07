-- ============================================
-- SCRIPT TẠO DATABASE ĐƠN GIẢN
-- Chỉ bao gồm: Products và Users (Admin)
-- ============================================
-- 
-- HƯỚNG DẪN:
-- 1. Mở SQL Server Management Studio
-- 2. Kết nối đến SQL Server
-- 3. Chạy toàn bộ script này
-- 4. Sau khi chạy xong, bạn sẽ có database với tài khoản admin:
--    Username: xuanloc
--    Password: xuanloc123
--
-- ============================================

-- Bước 1: Sử dụng Database CTXQ
-- ============================================
USE CTXQ;
GO

PRINT '✅ Đang sử dụng database CTXQ';
GO

-- ============================================
-- Bước 2: Tạo bảng Users (Người dùng/Admin)
-- ============================================

CREATE TABLE Users (
  id INT IDENTITY PRIMARY KEY,
  username NVARCHAR(100) NOT NULL UNIQUE,
  phone NVARCHAR(30) NOT NULL UNIQUE,
  address NVARCHAR(255) NOT NULL,
  passwordHash NVARCHAR(255) NOT NULL,
  isAdmin BIT NOT NULL DEFAULT 0,
  createdAt DATETIME DEFAULT GETDATE()
);
GO

PRINT '✅ Đã tạo bảng Users';
GO

-- ============================================
-- Bước 3: Tạo bảng Products (Sản phẩm)
-- ============================================

CREATE TABLE Products (
  id INT IDENTITY PRIMARY KEY,
  name NVARCHAR(255) NOT NULL,
  description NVARCHAR(MAX),
  price DECIMAL(18, 2) NOT NULL,
  category NVARCHAR(50) NOT NULL, -- 'Sâm', 'Mỹ phẩm', etc.
  imageUrl NVARCHAR(500), -- URL to product image
  inventory INT DEFAULT 0, -- Stock quantity
  isFeatured BIT DEFAULT 0, -- Featured product flag
  isPromotion BIT DEFAULT 0, -- Promotion/discount flag
  promotionPrice DECIMAL(18, 2), -- Discounted price if on promotion
  status NVARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'out_of_stock'
  createdAt DATETIME DEFAULT GETDATE(),
  updatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Tạo Indexes cho Products để tăng tốc độ truy vấn
CREATE INDEX IX_Products_Category ON Products(category);
GO

CREATE INDEX IX_Products_Status ON Products(status);
GO

CREATE INDEX IX_Products_Featured ON Products(isFeatured);
GO

PRINT '✅ Đã tạo bảng Products và Indexes';
GO

-- ============================================
-- Bước 4: TẠO TÀI KHOẢN ADMIN
-- ============================================

-- Tạo tài khoản admin
-- Username: xuanloc
-- Password: xuanloc123
-- Hash của mật khẩu "xuanloc123" (bcrypt, salt rounds = 10)
INSERT INTO Users (username, phone, address, passwordHash, isAdmin)
VALUES (
    'xuanloc',
    '0903066233',
    'Lô D39 KDC Tân Tiến P.Tân Thới Hiệp Q12',
    '$2b$10$jRHdayy6cK.ckxT0VNKxzeateLy0zywlzkNYcbM0Cgvp7mPs8irF.',  -- Hash của "xuanloc123"
    1  -- isAdmin = true
);
GO

PRINT '✅ Đã tạo tài khoản admin thành công!';
PRINT '   Username: xuanloc';
PRINT '   Password: xuanloc123';
GO

-- ============================================
-- Bước 5: Kiểm tra kết quả
-- ============================================

PRINT '';
PRINT '============================================';
PRINT 'KIỂM TRA KẾT QUẢ';
PRINT '============================================';

-- Kiểm tra tài khoản admin
SELECT 
    id,
    username,
    phone,
    address,
    isAdmin,
    createdAt
FROM Users 
WHERE username = 'xuanloc';
GO

-- Đếm số bảng đã tạo
SELECT 
    COUNT(*) AS TotalTables
FROM sys.tables
WHERE type = 'U';
GO

-- Kiểm tra cấu trúc bảng Products
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Products'
ORDER BY ORDINAL_POSITION;
GO

PRINT '';
PRINT '============================================';
PRINT 'HOÀN TẤT!';
PRINT '============================================';
PRINT 'Database đã được tạo thành công!';
PRINT '';
PRINT 'Các bảng đã tạo:';
PRINT '  - Users (quản lý tài khoản admin)';
PRINT '  - Products (quản lý sản phẩm)';
PRINT '';
PRINT 'Tài khoản admin:';
PRINT '  Username: xuanloc';
PRINT '  Password: xuanloc123';
PRINT '';
PRINT 'Bạn có thể đăng nhập tại: /dang-nhap';
PRINT '============================================';
GO

