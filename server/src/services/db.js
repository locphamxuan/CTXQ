const sql = require('mssql');

let pool;

async function getPool() {
  if (pool) {
    try {
      // Kiểm tra xem pool còn hoạt động không
      await pool.request().query('SELECT 1');
      return pool;
    } catch (err) {
      // Pool đã bị đóng, tạo lại
      pool = null;
    }
  }

  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    }
  };

  try {
    if (!config.user || !config.password || !config.server || !config.database) {
      throw new Error('Database configuration is incomplete. Please check your .env file.');
    }

    pool = await sql.connect(config);
    console.log('Database connected successfully');
    return pool;
  } catch (err) {
    console.error('Database connection error:', err.message);
    pool = null;
    throw err;
  }
}

async function query(text, params = []) {
  try {
    const currentPool = await getPool();
    if (!currentPool) {
      throw new Error('Database connection pool is not available');
    }
    
    const request = currentPool.request();

    params.forEach(({ name, type, value }) => {
      request.input(name, type || sql.NVarChar, value);
    });

    const result = await request.query(text);
    return result.recordset;
  } catch (err) {
    console.error('Database query error:', {
      message: err.message,
      query: text.substring(0, 100),
      params: params.map(p => ({ name: p.name, hasValue: !!p.value }))
    });
    throw err;
  }
}

module.exports = {
  sql,
  getPool,
  query
};

