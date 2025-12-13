import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { checkout } from '../services/api';
import qrCodeImage from '../img/QR Thanh toán của Lộc.jpg';

export default function CheckoutPage() {
  const { isAuthenticated, user } = useAuth();
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'bank'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [transactionCode, setTransactionCode] = useState<string>('');

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

  const generateTransactionCode = () => {
    return 'TX' + Date.now().toString().slice(-8) + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const handlePayment = async () => {
    console.log('handlePayment called', { user, itemsLength: items.length, paymentMethod });
    
    if (!user || items.length === 0) {
      console.error('Cannot process payment:', { user: !!user, itemsLength: items.length });
      alert('Không thể thanh toán. Vui lòng kiểm tra lại thông tin.');
      return;
    }

    try {
      setIsProcessing(true);
      setPaymentStatus('processing');
      const txCode = generateTransactionCode();
      setTransactionCode(txCode);
      console.log('Payment processing started:', { txCode, total: getTotal() });

      // Simulate payment processing (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Save order to database
      console.log('Saving order to database...');
      await checkout({
        userId: user.id,
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getTotal(),
        paymentMethod: paymentMethod,
        transactionCode: txCode
      });

      console.log('Order saved successfully');
      setPaymentStatus('success');
      
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 2000);
    } catch (err: any) {
      console.error('Payment error:', err);
      alert('Có lỗi xảy ra khi thanh toán: ' + (err?.response?.data?.message || err?.message || 'Lỗi không xác định'));
      setPaymentStatus('failed');
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

            {paymentMethod === 'qr' && (
              <div className="checkout__qr-section">
                <div className="checkout__qr-card">
                  <div className="checkout__qr-header">
                    <div className="checkout__qr-name">PHAM XUAN LOC</div>
                    <div className="checkout__qr-account">3170 4624 549</div>
                  </div>
                  <div className="checkout__qr-code">
                    <img 
                      src={qrCodeImage} 
                      alt="QR Code thanh toán"
                      loading="eager"
                    />
                  </div>
                  <div className="checkout__qr-amount">
                    Số tiền: <strong>{total.toLocaleString('vi-VN')} ₫</strong>
                  </div>
                  <div className="checkout__qr-instruction">
                    <p>Quét mã QR để thanh toán</p>
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
                        {transactionCode || 'Mã đơn hàng sẽ hiển thị sau khi xác nhận'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentStatus === 'pending' && !isProcessing && (
              <button
                type="button"
                className="btn btn--primary checkout__pay-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Payment button clicked', { 
                    paymentStatus, 
                    isProcessing, 
                    user: !!user, 
                    itemsLength: items.length,
                    total: getTotal()
                  });
                  handlePayment();
                }}
              >
                Xác nhận thanh toán
              </button>
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

