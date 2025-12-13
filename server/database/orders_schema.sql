-- Orders table
CREATE TABLE Orders (
  id INT IDENTITY PRIMARY KEY,
  userId INT NOT NULL,
  total DECIMAL(18, 2) NOT NULL,
  status NVARCHAR(50) DEFAULT 'pending',
  paymentMethod NVARCHAR(50),
  transactionCode NVARCHAR(100),
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

