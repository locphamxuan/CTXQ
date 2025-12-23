-- Thêm cột isAdmin vào bảng Users
USE MultisectorHoldings;
GO

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

