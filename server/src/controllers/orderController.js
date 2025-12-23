const { sql, query } = require('../services/db');
const { success, error } = require('../utils/response');
const { generatePaymentQR, generateTransactionCode } = require('../services/paymentService');

async function createOrder(req, res) {
  const { userId, items, total, paymentMethod, transactionCode } = req.body;

  try {
    console.log('Creating order:', { userId, itemCount: items.length, total, paymentMethod, transactionCode });

    // Validate input
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return error(res, 'Thông tin đơn hàng không hợp lệ', 400);
    }

    // Start transaction by creating order with 'pending' status
    // Order will be confirmed after payment verification
    const orderResult = await query(
      `INSERT INTO Orders (userId, total, status, paymentMethod, transactionCode)
       OUTPUT INSERTED.id, INSERTED.userId, INSERTED.total, INSERTED.status, INSERTED.paymentMethod, INSERTED.transactionCode, INSERTED.createdAt
       VALUES (@userId, @total, 'pending', @paymentMethod, @transactionCode)`,
      [
        { name: 'userId', type: sql.Int, value: userId },
        { name: 'total', type: sql.Decimal(18, 2), value: total },
        { name: 'paymentMethod', type: sql.NVarChar, value: paymentMethod || 'qr' },
        { name: 'transactionCode', type: sql.NVarChar, value: transactionCode || null }
      ]
    );

    if (!orderResult || orderResult.length === 0) {
      return error(res, 'Không thể tạo đơn hàng', 500);
    }

    const order = orderResult[0];
    const orderId = order.id;

    // Insert order items
    for (const item of items) {
      await query(
        `INSERT INTO OrderItems (orderId, productId, productName, price, quantity)
         VALUES (@orderId, @productId, @productName, @price, @quantity)`,
        [
          { name: 'orderId', type: sql.Int, value: orderId },
          { name: 'productId', type: sql.NVarChar, value: item.productId },
          { name: 'productName', type: sql.NVarChar, value: item.productName },
          { name: 'price', type: sql.Decimal(18, 2), value: item.price },
          { name: 'quantity', type: sql.Int, value: item.quantity }
        ]
      );
    }

    console.log('Order created successfully:', { orderId, userId, total, status: order.status });

    // Generate QR code if payment method is QR
    let qrCodeData = null;
    if (paymentMethod === 'qr') {
      try {
        // Bank account info (should be in .env in production)
        const accountNumber = '31704624549';
        const accountName = 'PHAM XUAN LOC';
        qrCodeData = await generatePaymentQR(orderId, total, accountNumber, accountName);
      } catch (err) {
        console.error('Error generating QR code:', err);
        // Continue without QR code, user can still pay manually
      }
    }

    return success(
      res,
      {
        orderId: order.id,
        userId: order.userId,
        total: order.total,
        status: order.status,
        paymentMethod: order.paymentMethod,
        transactionCode: order.transactionCode,
        createdAt: order.createdAt,
        qrCode: qrCodeData?.qrCode || null
      },
      201
    );
  } catch (err) {
    console.error('Create order error:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    return error(res, 'Tạo đơn hàng thất bại, vui lòng thử lại sau.', 500, err.message);
  }
}

// Get order by ID
async function getOrder(req, res) {
  const { id } = req.params;
  
  try {
    const orders = await query(
      `SELECT o.id, o.userId, o.total, o.status, o.paymentMethod, o.transactionCode, o.createdAt,
              u.username, u.phone, u.address
       FROM Orders o
       INNER JOIN Users u ON o.userId = u.id
       WHERE o.id = @id`,
      [{ name: 'id', type: sql.Int, value: parseInt(id) }]
    );

    if (!orders || orders.length === 0) {
      return error(res, 'Không tìm thấy đơn hàng', 404);
    }

    const order = orders[0];

    // Get order items
    const items = await query(
      `SELECT productId, productName, price, quantity
       FROM OrderItems
       WHERE orderId = @orderId`,
      [{ name: 'orderId', type: sql.Int, value: order.id }]
    );

    return success(res, {
      ...order,
      items: items || []
    });
  } catch (err) {
    console.error('Get order error:', err);
    return error(res, 'Không thể lấy thông tin đơn hàng', 500, err.message);
  }
}

// List orders (for admin or user's own orders)
async function listOrders(req, res) {
  const { userId, status } = req.query;
  
  try {
    let queryStr = `
      SELECT o.id, o.userId, o.total, o.status, o.paymentMethod, o.transactionCode, o.createdAt,
             u.username, u.phone, u.address
      FROM Orders o
      INNER JOIN Users u ON o.userId = u.id
      WHERE 1=1
    `;
    const params = [];

    if (userId) {
      queryStr += ` AND o.userId = @userId`;
      params.push({ name: 'userId', type: sql.Int, value: parseInt(userId) });
    }

    if (status) {
      queryStr += ` AND o.status = @status`;
      params.push({ name: 'status', type: sql.NVarChar, value: status });
    }

    queryStr += ` ORDER BY o.createdAt DESC`;

    const orders = await query(queryStr, params);

    return success(res, { orders: orders || [] });
  } catch (err) {
    console.error('List orders error:', err);
    return error(res, 'Không thể lấy danh sách đơn hàng', 500, err.message);
  }
}

// Confirm payment (update order status to 'completed')
async function confirmPayment(req, res) {
  const { orderId, transactionCode } = req.body;

  try {
    if (!orderId) {
      return error(res, 'Thiếu mã đơn hàng', 400);
    }

    // Update order status
    const result = await query(
      `UPDATE Orders 
       SET status = 'completed', transactionCode = @transactionCode
       WHERE id = @orderId AND status = 'pending'
       OUTPUT INSERTED.id, INSERTED.status`,
      [
        { name: 'orderId', type: sql.Int, value: parseInt(orderId) },
        { name: 'transactionCode', type: sql.NVarChar, value: transactionCode || null }
      ]
    );

    if (!result || result.length === 0) {
      return error(res, 'Không tìm thấy đơn hàng hoặc đơn hàng đã được xác nhận', 404);
    }

    console.log('Payment confirmed:', { orderId, transactionCode });

    return success(res, {
      orderId: result[0].id,
      status: result[0].status,
      message: 'Xác nhận thanh toán thành công'
    });
  } catch (err) {
    console.error('Confirm payment error:', err);
    return error(res, 'Không thể xác nhận thanh toán', 500, err.message);
  }
}

module.exports = {
  createOrder,
  getOrder,
  listOrders,
  confirmPayment
};

