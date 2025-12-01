const sql = require('mssql');

let pool;

async function getPool() {
  if (pool) {
    return pool;
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

  pool = await sql.connect(config);
  return pool;
}

async function query(text, params = []) {
  const currentPool = await getPool();
  const request = currentPool.request();

  params.forEach(({ name, type, value }) => {
    request.input(name, type || sql.NVarChar, value);
  });

  const result = await request.query(text);
  return result.recordset;
}

module.exports = {
  sql,
  getPool,
  query
};

