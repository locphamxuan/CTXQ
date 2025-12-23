const QRCode = require('qrcode');
const crypto = require('crypto');

/**
 * Generate dynamic QR code for bank transfer
 * Format: VietQR standard or custom format
 */
async function generatePaymentQR(orderId, amount, accountNumber, accountName, bankName = 'TPBank') {
  try {
    // VietQR format: bank://transfer?account=ACCOUNT&amount=AMOUNT&content=CONTENT
    // Or custom format with order info
    const content = `ORDER${orderId}`;
    const qrData = {
      account: accountNumber,
      amount: amount,
      content: content,
      bank: bankName
    };

    // Create QR code string (can be formatted as JSON or URL)
    const qrString = JSON.stringify(qrData);
    
    // Generate QR code image as data URL
    const qrCodeDataURL = await QRCode.toDataURL(qrString, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      width: 500
    });

    return {
      qrCode: qrCodeDataURL,
      qrString: qrString,
      content: content
    };
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw new Error('Không thể tạo mã QR thanh toán');
  }
}

/**
 * Generate transaction code
 */
function generateTransactionCode(orderId) {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TX${timestamp}${random}${orderId}`;
}

/**
 * Verify payment (can be extended to verify with bank API or webhook)
 */
function verifyPayment(transactionCode, amount, orderId) {
  // Basic validation
  if (!transactionCode || transactionCode.length < 10) {
    return { valid: false, reason: 'Mã giao dịch không hợp lệ' };
  }

  // In production, this would verify with bank API or webhook
  // For now, return basic validation
  return { valid: true };
}

module.exports = {
  generatePaymentQR,
  generateTransactionCode,
  verifyPayment
};

