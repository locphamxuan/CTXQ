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

