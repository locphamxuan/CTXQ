const { sql, query } = require('../services/db');
const { success, error } = require('../utils/response');

async function createOrder(req, res) {
  const { userId, items, total, paymentMethod, transactionCode } = req.body;

  try {
    console.log('Creating order:', { userId, itemCount: items.length, total, paymentMethod, transactionCode });

    // Validate input
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return error(res, 'Thông tin đơn hàng không hợp lệ', 400);
    }

    // Start transaction by creating order
    const orderResult = await query(
      `INSERT INTO Orders (userId, total, status, paymentMethod, transactionCode)
       OUTPUT INSERTED.id, INSERTED.userId, INSERTED.total, INSERTED.paymentMethod, INSERTED.transactionCode, INSERTED.createdAt
       VALUES (@userId, @total, 'completed', @paymentMethod, @transactionCode)`,
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

    console.log('Order created successfully:', { orderId, userId, total });

    return success(
      res,
      {
        orderId: order.id,
        userId: order.userId,
        total: order.total,
        paymentMethod: order.paymentMethod,
        transactionCode: order.transactionCode,
        createdAt: order.createdAt
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

module.exports = {
  createOrder
};

