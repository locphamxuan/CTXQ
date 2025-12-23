CREATE DATABASE MultisectorHoldings;
GO

USE MultisectorHoldings;
GO

CREATE TABLE HeroSections (
  id INT IDENTITY PRIMARY KEY,
  headline NVARCHAR(255),
  subheadline NVARCHAR(512),
  ctaPrimaryLabel NVARCHAR(100),
  ctaPrimaryHref NVARCHAR(255),
  ctaSecondaryLabel NVARCHAR(100),
  ctaSecondaryHref NVARCHAR(255),
  updatedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE Users (
  id INT IDENTITY PRIMARY KEY,
  username NVARCHAR(100) NOT NULL UNIQUE,
  phone NVARCHAR(30) NOT NULL UNIQUE,
  address NVARCHAR(255) NOT NULL,
  passwordHash NVARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE MissionStatements (
  id INT IDENTITY PRIMARY KEY,
  mission NVARCHAR(700),
  differentiators NVARCHAR(MAX),
  updatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE NewsHighlights (
  id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
  title NVARCHAR(255),
  category NVARCHAR(50),
  publishedAt DATE DEFAULT GETDATE()
);

CREATE TABLE AboutSections (
  id INT IDENTITY PRIMARY KEY,
  story NVARCHAR(MAX),
  vision NVARCHAR(500),
  mission NVARCHAR(500),
  valuesJson NVARCHAR(MAX),
  foundersJson NVARCHAR(MAX),
  timelineJson NVARCHAR(MAX),
  updatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE BusinessDomains (
  id NVARCHAR(50) PRIMARY KEY,
  title NVARCHAR(255),
  summary NVARCHAR(700),
  quickLinks NVARCHAR(MAX),
  contentJson NVARCHAR(MAX),
  displayOrder INT
);

CREATE TABLE BlogPosts (
  id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
  title NVARCHAR(255),
  summary NVARCHAR(700),
  category NVARCHAR(50),
  image NVARCHAR(700),
  publishedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE ContactRequests (
  id INT IDENTITY PRIMARY KEY,
  fullName NVARCHAR(150) NOT NULL,
  email NVARCHAR(150) NOT NULL,
  phone NVARCHAR(30),
  message NVARCHAR(MAX),
  createdAt DATETIME DEFAULT GETDATE()
);

-- Orders table
CREATE TABLE Orders (
  id INT IDENTITY PRIMARY KEY,
  userId INT NOT NULL,
  total DECIMAL(18, 2) NOT NULL,
  status NVARCHAR(50) DEFAULT 'pending',
  createdAt DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (userId) REFERENCES Users(id)
);

-- OrderItems table
CREATE TABLE OrderItems (
  id INT IDENTITY PRIMARY KEY,
  orderId INT NOT NULL,
  productId NVARCHAR(100) NOT NULL,
  productName NVARCHAR(255) NOT NULL,
  price DECIMAL(18, 2) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (orderId) REFERENCES Orders(id) ON DELETE CASCADE
);

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



-- Example seed with JSON payloads
INSERT INTO BusinessDomains (id, title, summary, quickLinks, contentJson, displayOrder)
VALUES (
  'ginseng-beauty',
  N'Sâm & Mỹ phẩm Hàn Quốc',
  N'Phân phối sâm chính hãng...',
  N'["Sâm","Thực phẩm chức năng","Skincare","Makeup"]',
  N'{}',
  1
);

  ALTER TABLE Orders ADD paymentMethod NVARCHAR(50);
  ALTER TABLE Orders ADD transactionCode NVARCHAR(100);
    ALTER TABLE Users ADD isAdmin BIT NOT NULL DEFAULT 0;
USE MultisectorHoldings;
GO

UPDATE Users
SET isAdmin = 1
WHERE username = N'Xuan loc';   -- hoặc WHERE phone = '0862317046';



