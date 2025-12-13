const express = require('express');
const cors = require('cors');
const contentRoutes = require('./routes/contentRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*'
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) =>
  res.json({ success: true, message: 'API is up' })
);

app.use('/api', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Máy chủ gặp lỗi, vui lòng thử lại'
  });
});

module.exports = app;

