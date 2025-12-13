import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap');
    }
  }, [isAuthenticated, navigate]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate('/thanh-toan');
  };

  if (!isAuthenticated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="cart">
        <h1>Giỏ hàng</h1>
        <div className="cart__empty">
          <p>Giỏ hàng của bạn đang trống.</p>
          <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Giỏ hàng</h1>
      <div className="cart__container">
        <div className="cart__items">
          {items.map((item) => (
            <div key={item.id} className="cart__item">
              <div className="cart__item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart__item-details">
                <h3 className="cart__item-name">{item.name}</h3>
                {item.description && (
                  <p className="cart__item-description">{item.description}</p>
                )}
                <div className="cart__item-price">
                  {item.price.toLocaleString('vi-VN')} ₫
                </div>
              </div>
              <div className="cart__item-controls">
                <div className="cart__quantity">
                  <button
                    className="cart__quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="cart__quantity-value">{item.quantity}</span>
                  <button
                    className="cart__quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="cart__item-total">
                  {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                </div>
                <button
                  className="cart__item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__summary">
          <div className="cart__summary-content">
            <h2>Tổng đơn hàng</h2>
            <div className="cart__summary-row">
              <span>Tổng cộng:</span>
              <span className="cart__summary-total">
                {getTotal().toLocaleString('vi-VN')} ₫
              </span>
            </div>
            <button
              className="btn btn--primary cart__checkout-btn"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
