const bcrypt = require('bcryptjs');
const { sql, query } = require('../services/db');
const { success, error } = require('../utils/response');

// ==== USERS (read‑only for now, admin tạo tài khoản qua trang đăng ký) ====

async function listUsers(req, res) {
  try {
    const users = await query(
      `SELECT id, username, phone, address, createdAt, isAdmin
       FROM Users
       ORDER BY createdAt DESC`
    );
    
    // Chuyển đổi isAdmin từ BIT sang boolean
    // SQL Server BIT có thể trả về: true/false, 1/0, Buffer, hoặc null
    const usersWithRole = users.map(user => {
      let isAdmin = false;
      
      // Log để debug
      console.log('User isAdmin raw:', {
        username: user.username,
        raw: user.isAdmin,
        type: typeof user.isAdmin,
        isBuffer: Buffer.isBuffer(user.isAdmin),
        value: user.isAdmin
      });
      
      // Xử lý các trường hợp có thể xảy ra
      if (user.isAdmin === true || user.isAdmin === 1) {
        isAdmin = true;
      } else if (user.isAdmin === false || user.isAdmin === 0 || user.isAdmin === null || user.isAdmin === undefined) {
        isAdmin = false;
      } else if (Buffer.isBuffer(user.isAdmin)) {
        // Nếu là Buffer, đọc byte đầu tiên
        isAdmin = user.isAdmin[0] === 1;
      } else if (typeof user.isAdmin === 'string') {
        isAdmin = user.isAdmin === '1' || user.isAdmin.toLowerCase() === 'true';
      } else {
        // Fallback: chuyển sang boolean
        isAdmin = Boolean(user.isAdmin);
      }
      
      return {
        ...user,
        isAdmin
      };
    });
    
    return success(res, { users: usersWithRole });
  } catch (err) {
    return error(res, 'Không thể tải danh sách tài khoản', 500, err.message);
  }
}

// ==== MONEY SOURCES CRUD ====

async function listMoneySources(req, res) {
  try {
    const sources = await query(
      `SELECT id, name, description, createdAt
       FROM MoneySources
       ORDER BY createdAt DESC`
    );
    return success(res, { sources });
  } catch (err) {
    return error(res, 'Không thể tải danh sách nguồn tiền', 500, err.message);
  }
}

async function createMoneySource(req, res) {
  const { name, description } = req.body;

  try {
    const rows = await query(
      `INSERT INTO MoneySources (name, description)
       OUTPUT INSERTED.id, INSERTED.name, INSERTED.description, INSERTED.createdAt
       VALUES (@name, @description)`,
      [
        { name: 'name', type: sql.NVarChar, value: name },
        { name: 'description', type: sql.NVarChar, value: description || null }
      ]
    );

    return success(res, { source: rows[0] }, 201);
  } catch (err) {
    return error(res, 'Không thể tạo nguồn tiền', 500, err.message);
  }
}

async function updateMoneySource(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const rows = await query(
      `UPDATE MoneySources
       SET name = @name,
           description = @description
       OUTPUT INSERTED.id, INSERTED.name, INSERTED.description, INSERTED.createdAt
       WHERE id = @id`,
      [
        { name: 'id', type: sql.Int, value: Number(id) },
        { name: 'name', type: sql.NVarChar, value: name },
        { name: 'description', type: sql.NVarChar, value: description || null }
      ]
    );

    if (!rows.length) {
      return error(res, 'Không tìm thấy nguồn tiền', 404);
    }

    return success(res, { source: rows[0] });
  } catch (err) {
    return error(res, 'Không thể cập nhật nguồn tiền', 500, err.message);
  }
}

async function deleteMoneySource(req, res) {
  const { id } = req.params;

  try {
    await query(
      'DELETE FROM MoneySources WHERE id = @id',
      [{ name: 'id', type: sql.Int, value: Number(id) }]
    );

    return success(res, { message: 'Đã xóa nguồn tiền' });
  } catch (err) {
    return error(
      res,
      'Không thể xóa nguồn tiền (có thể đang được dùng trong dòng tiền)',
      500,
      err.message
    );
  }
}

// ==== CASHFLOWS CRUD ====

async function listCashFlows(req, res) {
  const { from, to } = req.query;

  try {
    let where = '1 = 1';
    const params = [];

    if (from) {
      where += ' AND occurredAt >= @from';
      params.push({ name: 'from', type: sql.DateTime, value: new Date(from) });
    }

    if (to) {
      where += ' AND occurredAt < DATEADD(day, 1, @to)';
      params.push({ name: 'to', type: sql.DateTime, value: new Date(to) });
    }

    const flows = await query(
      `SELECT cf.id,
              cf.sourceId,
              ms.name AS sourceName,
              cf.amount,
              cf.type,
              cf.note,
              cf.occurredAt,
              cf.createdAt
       FROM CashFlows cf
       JOIN MoneySources ms ON cf.sourceId = ms.id
       WHERE ${where}
       ORDER BY cf.occurredAt DESC`,
      params
    );

    return success(res, { flows });
  } catch (err) {
    return error(res, 'Không thể tải danh sách dòng tiền', 500, err.message);
  }
}

async function createCashFlow(req, res) {
  const { sourceId, amount, type, note, occurredAt } = req.body;

  try {
    const rows = await query(
      `INSERT INTO CashFlows (sourceId, amount, type, note, occurredAt)
       OUTPUT INSERTED.id, INSERTED.sourceId, INSERTED.amount, INSERTED.type,
              INSERTED.note, INSERTED.occurredAt, INSERTED.createdAt
       VALUES (@sourceId, @amount, @type, @note, @occurredAt)`,
      [
        { name: 'sourceId', type: sql.Int, value: Number(sourceId) },
        { name: 'amount', type: sql.Decimal(18, 2), value: amount },
        { name: 'type', type: sql.NVarChar, value: type },
        { name: 'note', type: sql.NVarChar, value: note || null },
        { name: 'occurredAt', type: sql.DateTime, value: occurredAt ? new Date(occurredAt) : new Date() }
      ]
    );

    return success(res, { cashFlow: rows[0] }, 201);
  } catch (err) {
    return error(res, 'Không thể tạo dòng tiền', 500, err.message);
  }
}

async function deleteCashFlow(req, res) {
  const { id } = req.params;

  try {
    await query(
      'DELETE FROM CashFlows WHERE id = @id',
      [{ name: 'id', type: sql.Int, value: Number(id) }]
    );

    return success(res, { message: 'Đã xóa dòng tiền' });
  } catch (err) {
    return error(res, 'Không thể xóa dòng tiền', 500, err.message);
  }
}

// ==== DAILY REPORT ====

async function getDailyReport(req, res) {
  const { date } = req.query;

  try {
    const targetDate = date ? new Date(date) : new Date();
    const iso = targetDate.toISOString().slice(0, 10); // YYYY-MM-DD

    // Thu từ Orders
    const orderRows = await query(
      `SELECT ISNULL(SUM(total), 0) AS totalIncome
       FROM Orders
       WHERE CAST(createdAt AS date) = @date`,
      [{ name: 'date', type: sql.Date, value: iso }]
    );

    const ordersIncome = orderRows[0]?.totalIncome || 0;

    // Thu / chi từ CashFlows
    const cashRows = await query(
      `SELECT
          ISNULL(SUM(CASE WHEN type = 'IN' THEN amount ELSE 0 END), 0) AS totalIn,
          ISNULL(SUM(CASE WHEN type = 'OUT' THEN amount ELSE 0 END), 0) AS totalOut
       FROM CashFlows
       WHERE CAST(occurredAt AS date) = @date`,
      [{ name: 'date', type: sql.Date, value: iso }]
    );

    const cashIn = cashRows[0]?.totalIn || 0;
    const cashOut = cashRows[0]?.totalOut || 0;

    const totalIncome = Number(ordersIncome) + Number(cashIn);
    const totalExpense = Number(cashOut);

    return success(res, {
      date: iso,
      ordersIncome,
      cashIn,
      cashOut,
      totalIncome,
      totalExpense,
      net: totalIncome - totalExpense
    });
  } catch (err) {
    return error(res, 'Không thể tạo báo cáo ngày', 500, err.message);
  }
}

module.exports = {
  listUsers,
  listMoneySources,
  createMoneySource,
  updateMoneySource,
  deleteMoneySource,
  listCashFlows,
  createCashFlow,
  deleteCashFlow,
  getDailyReport
};


