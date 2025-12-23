-- Admin schema for financial tracking
-- Run this script after the main schema.sql

USE MultisectorHoldings;
GO

IF OBJECT_ID('dbo.MoneySources', 'U') IS NULL
BEGIN
  CREATE TABLE MoneySources (
    id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(150) NOT NULL,
    description NVARCHAR(500),
    createdAt DATETIME DEFAULT GETDATE()
  );
END;
GO

IF OBJECT_ID('dbo.CashFlows', 'U') IS NULL
BEGIN
  CREATE TABLE CashFlows (
    id INT IDENTITY PRIMARY KEY,
    sourceId INT NOT NULL,
    amount DECIMAL(18, 2) NOT NULL,
    type NVARCHAR(10) NOT NULL, -- 'IN' (thu) hoặc 'OUT' (chi)
    note NVARCHAR(500),
    occurredAt DATETIME NOT NULL DEFAULT GETDATE(),
    createdAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (sourceId) REFERENCES MoneySources(id)
  );
END;
GO
