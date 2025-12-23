import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { checkout, confirmPayment } from '../services/api';
import qrCodeImage from '../img/QR Thanh toán của Lộc.jpg';

export default function CheckoutPage() {
  const { isAuthenticated, user } = useAuth();
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'bank'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed' | 'waiting_payment'>('pending');
  const [transactionCode, setTransactionCode] = useState<string>('');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [dynamicQRCode, setDynamicQRCode] = useState<string | null>(null);
  const [inputTransactionCode, setInputTransactionCode] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap');
      return;
    }
    if (items.length === 0) {
      navigate('/gio-hang');
      return;
    }
  }, [isAuthenticated, items.length, navigate]);

  // Step 1: Create order (status: pending)
  const handleCreateOrder = async () => {
    console.log('Creating order:', { user, itemsLength: items.length, paymentMethod });
    
    if (!user || items.length === 0) {
      console.error('Cannot create order:', { user: !!user, itemsLength: items.length });
      alert('Không thể tạo đơn hàng. Vui lòng kiểm tra lại thông tin.');
      return;
    }

    try {
      setIsProcessing(true);
      setPaymentStatus('processing');

      // Create order with pending status
      console.log('Creating order in database...');
      const orderData = await checkout({
        userId: user.id,
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getTotal(),
        paymentMethod: paymentMethod
      });

      console.log('Order created successfully:', orderData);
      setOrderId(orderData.orderId);
      
      // Set dynamic QR code if available
      if (orderData.qrCode) {
        setDynamicQRCode(orderData.qrCode);
      }
      
      setPaymentStatus('waiting_payment');
      setIsProcessing(false);
    } catch (err: any) {
      console.error('Create order error:', err);
      alert('Có lỗi xảy ra khi tạo đơn hàng: ' + (err?.response?.data?.message || err?.message || 'Lỗi không xác định'));
      setPaymentStatus('failed');
      setIsProcessing(false);
    }
  };

  // Step 2: Confirm payment with transaction code
  const handleConfirmPayment = async () => {
    if (!orderId || !inputTransactionCode.trim()) {
      alert('Vui lòng nhập mã giao dịch');
      return;
    }

    try {
      setIsProcessing(true);
      setPaymentStatus('processing');

      console.log('Confirming payment:', { orderId, transactionCode: inputTransactionCode });
      await confirmPayment(orderId, inputTransactionCode.trim());

      console.log('Payment confirmed successfully');
      setPaymentStatus('success');
      setTransactionCode(inputTransactionCode.trim());
      
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 2000);
    } catch (err: any) {
      console.error('Confirm payment error:', err);
      alert('Có lỗi xảy ra khi xác nhận thanh toán: ' + (err?.response?.data?.message || err?.message || 'Lỗi không xác định'));
      setPaymentStatus('waiting_payment');
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated || items.length === 0) {
    console.log('Checkout: Cannot render - missing auth or items', { isAuthenticated, itemsLength: items.length });
    return null;
  }

  const total = getTotal();
  console.log('Checkout: Rendering page', { total, paymentStatus, isProcessing, itemsCount: items.length });

  return (
    <div className="checkout">
      <h1>Thanh toán</h1>
      
      <div className="checkout__container">
        <div className="checkout__left">
          <div className="checkout__order-summary">
            <h2>Thông tin đơn hàng</h2>
            <div className="checkout__customer-info">
              <div className="checkout__info-row">
                <span>Khách hàng:</span>
                <span>{user?.username}</span>
              </div>
              <div className="checkout__info-row">
                <span>Số điện thoại:</span>
                <span>{user?.phone}</span>
              </div>
              <div className="checkout__info-row">
                <span>Địa chỉ:</span>
                <span>{user?.address}</span>
              </div>
            </div>

            <div className="checkout__items">
              <h3>Sản phẩm</h3>
              {items.map((item) => (
                <div key={item.id} className="checkout__item">
                  <div className="checkout__item-info">
                    <span className="checkout__item-name">{item.name}</span>
                    <span className="checkout__item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="checkout__item-price">
                    {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout__total">
              <div className="checkout__total-row">
                <span>Tổng cộng:</span>
                <span className="checkout__total-amount">
                  {total.toLocaleString('vi-VN')} ₫
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout__right">
          <div className="checkout__payment">
            <h2>Phương thức thanh toán</h2>
            
            <div className="checkout__payment-methods">
              <label className="checkout__payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="qr"
                  checked={paymentMethod === 'qr'}
                  onChange={() => setPaymentMethod('qr')}
                  disabled={isProcessing}
                />
                <span>Quét QR Code</span>
              </label>
              <label className="checkout__payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  disabled={isProcessing}
                />
                <span>Chuyển khoản ngân hàng</span>
              </label>
            </div>

            {paymentMethod === 'qr' && paymentStatus !== 'waiting_payment' && (
              <div className="checkout__qr-payment-container">
                {/* Left Panel: Account Information */}
                <div className="checkout__account-info">
                  <h3>Thông tin tài khoản</h3>
                  <div className="checkout__account-details">
                    <div className="checkout__account-row">
                      <label>CHỦ TÀI KHOẢN</label>
                      <div className="checkout__account-value-wrapper">
                        <span className="checkout__account-value">PHAM XUAN LOC</span>
                        <button
                          type="button"
                          className="checkout__copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText('PHAM XUAN LOC');
                            alert('Đã sao chép!');
                          }}
                          aria-label="Copy"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                    <div className="checkout__account-row">
                      <label>SỐ TÀI KHOẢN</label>
                      <div className="checkout__account-value-wrapper">
                        <span className="checkout__account-value">3170 4624 549</span>
                        <button
                          type="button"
                          className="checkout__copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText('3170 4624 549');
                            alert('Đã sao chép!');
                          }}
                          aria-label="Copy"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                    <div className="checkout__account-row">
                      <label>NGÂN HÀNG</label>
                      <div className="checkout__account-value-wrapper">
                        <span className="checkout__account-value">TPBank</span>
                        <button
                          type="button"
                          className="checkout__copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText('TPBank');
                            alert('Đã sao chép!');
                          }}
                          aria-label="Copy"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                    <div className="checkout__account-row">
                      <label>NỘI DUNG CHUYỂN</label>
                      <div className="checkout__account-value-wrapper">
                        <span className="checkout__account-value">
                          {orderId ? `ORDER${orderId}` : 'Mã đơn hàng sẽ hiển thị sau khi tạo đơn'}
                        </span>
                        {orderId && (
                          <button
                            type="button"
                            className="checkout__copy-btn"
                            onClick={() => {
                              navigator.clipboard.writeText(`ORDER${orderId}`);
                              alert('Đã sao chép!');
                            }}
                            aria-label="Copy"
                          >
                            📋
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="checkout__exchange-rate">
                    <p>1.000 VNĐ = 1.000 VNĐ</p>
                    <small>Tỷ giá quy đổi cố định</small>
                  </div>
                </div>

                {/* Right Panel: QR Code */}
                <div className="checkout__qr-section">
                  <h3>Quét mã QR để nạp tiền</h3>
                  <p className="checkout__qr-description">
                    Sử dụng ứng dụng ngân hàng để quét mã QR và chuyển tiền tự động
                  </p>
                  <div className="checkout__qr-card">
                    <div className="checkout__qr-code">
                      {dynamicQRCode ? (
                        <img 
                          src={dynamicQRCode} 
                          alt="QR Code thanh toán động"
                          loading="eager"
                        />
                      ) : (
                        <img 
                          src={qrCodeImage} 
                          alt="QR Code thanh toán"
                          loading="eager"
                        />
                      )}
                    </div>
                  </div>
                  <div className="checkout__payment-logos">
                    <span>napas 247</span>
                    <span>mo mo</span>
                    <span>VNPAY</span>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="checkout__bank-section">
                <div className="checkout__bank-info">
                  <h3>Thông tin chuyển khoản</h3>
                  <div className="checkout__bank-details">
                    <div className="checkout__bank-row">
                      <span>Ngân hàng:</span>
                      <span>TPBank</span>
                    </div>
                    <div className="checkout__bank-row">
                      <span>Số tài khoản:</span>
                      <span>3170 4624 549</span>
                    </div>
                    <div className="checkout__bank-row">
                      <span>Chủ tài khoản:</span>
                      <span>PHAM XUAN LOC</span>
                    </div>
                    <div className="checkout__bank-row">
                      <span>Số tiền:</span>
                      <span><strong>{total.toLocaleString('vi-VN')} ₫</strong></span>
                    </div>
                    <div className="checkout__bank-note">
                      <strong>Nội dung chuyển khoản:</strong>
                      <div className="checkout__bank-note-code">
                        {orderId ? `ORDER${orderId}` : 'Mã đơn hàng sẽ hiển thị sau khi tạo đơn'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Create order button */}
            {paymentStatus === 'pending' && !isProcessing && (
              <button
                type="button"
                className="btn btn--primary checkout__pay-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCreateOrder();
                }}
              >
                Tạo đơn hàng
              </button>
            )}

            {/* Step 2: Waiting for payment - show transaction code input */}
            {paymentStatus === 'waiting_payment' && (
              <div className="checkout__waiting-payment">
                <div className="checkout__order-created">
                  <h3>✓ Đơn hàng đã được tạo</h3>
                  <p>Mã đơn hàng: <strong>#{orderId}</strong></p>
                  <p className="checkout__instruction">
                    Vui lòng chuyển khoản <strong>{total.toLocaleString('vi-VN')} ₫</strong> theo thông tin trên.
                    Sau khi chuyển khoản, vui lòng nhập mã giao dịch để xác nhận.
                  </p>
                </div>
                
                <div className="checkout__transaction-input">
                  <label htmlFor="transactionCode">Mã giao dịch (từ ngân hàng):</label>
                  <input
                    id="transactionCode"
                    type="text"
                    value={inputTransactionCode}
                    onChange={(e) => setInputTransactionCode(e.target.value)}
                    placeholder="VD: 1234567890"
                    disabled={isProcessing}
                    className="checkout__transaction-input-field"
                  />
                </div>

                <button
                  type="button"
                  className="btn btn--primary checkout__pay-btn"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing || !inputTransactionCode.trim()}
                >
                  {isProcessing ? 'Đang xác nhận...' : 'Xác nhận thanh toán'}
                </button>
              </div>
            )}
            
            {paymentStatus === 'pending' && isProcessing && (
              <div className="checkout__processing">
                <div className="checkout__spinner"></div>
                <p>Đang chuẩn bị...</p>
              </div>
            )}

            {paymentStatus === 'processing' && (
              <div className="checkout__processing">
                <div className="checkout__spinner"></div>
                <p>Đang xử lý thanh toán...</p>
                {transactionCode && (
                  <p className="checkout__tx-code">Mã giao dịch: {transactionCode}</p>
                )}
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="checkout__success">
                <div className="checkout__success-icon">✓</div>
                <h3>Thanh toán thành công!</h3>
                <p>Đơn hàng của bạn đã được xác nhận.</p>
                {transactionCode && (
                  <p className="checkout__tx-code">Mã giao dịch: {transactionCode}</p>
                )}
                <p>Đang chuyển về trang chủ...</p>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="checkout__failed">
                <div className="checkout__failed-icon">✗</div>
                <h3>Thanh toán thất bại</h3>
                <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
                <button
                  className="btn btn--primary"
                  onClick={() => {
                    setPaymentStatus('pending');
                    setIsProcessing(false);
                  }}
                >
                  Thử lại
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

