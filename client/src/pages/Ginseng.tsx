import { useCallback, useRef, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, ConfirmDialog } from '../components/Modal';
import boneImage from '../img/Viên bổ xương khớp.png';
import ginsengExtractImage from '../img/tinh chất hồng sâm.jpg';
import freshGinsengImage from '../img/nhân sâm tươi hàn quốc.jpg';
import ginseng365Image from '../img/cao-hong-sam-han-quoc-365-moi-2-lo-tang-keo-hong-sam.jpg';

const products = [
  {
    id: 'gs-001',
    name: 'Viên bổ xương khớp',
    price: 350000,
    image: boneImage,
    description: 'Hỗ trợ sức khỏe xương khớp, giảm đau nhức, tăng cường sự linh hoạt'
  },
  {
    id: 'gs-002',
    name: 'Tinh chất hồng sâm',
    price: 1200000,
    image: ginsengExtractImage,
    description: 'Tinh chất hồng sâm Hàn Quốc cao cấp, tăng cường sức khỏe và sinh lực'
  },
  {
    id: 'gs-003',
    name: 'Nhân sâm tươi Hàn Quốc',
    price: 2500000,
    image: freshGinsengImage,
    description: 'Nhân sâm tươi 6 năm tuổi, chất lượng cao, nguyên liệu tươi ngon'
  },
  {
    id: 'gs-004',
    name: 'Cao hồng sâm Hàn Quốc 365',
    price: 1800000,
    image: ginseng365Image,
    description: 'Cao hồng sâm đóng hộp, tiện lợi, bổ dưỡng, tăng cường miễn dịch'
  }
];

export default function GinsengPage() {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const processingRef = useRef<{ [key: string]: boolean }>({});
  
  const [showLoginConfirm, setShowLoginConfirm] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddToCart = useCallback((product: typeof products[0]) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setAlertMessage('');
      setShowLoginConfirm(true);
      return;
    }

    // Prevent double click for this specific product
    if (processingRef.current[product.id]) {
      console.log('handleAddToCart: Already processing for product', product.id);
      return;
    }

    try {
      processingRef.current[product.id] = true;
      console.log('Adding to cart:', product);
      
      // Convert image to string if it's an imported module
      const imageUrl = typeof product.image === 'string' 
        ? product.image 
        : (product.image as any)?.src || (product.image as any)?.default || String(product.image);
      
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        description: product.description
      });
      
      // Show success message
      setShowSuccessAlert(true);
      
      // Reset processing flag after delay
      setTimeout(() => {
        processingRef.current[product.id] = false;
      }, 1000);
    } catch (err) {
      console.error('Error adding to cart:', err);
      processingRef.current[product.id] = false;
      const errorMessage = (err as Error).message;
      if (errorMessage.includes('đăng nhập')) {
        setAlertMessage(errorMessage);
        setShowLoginConfirm(true);
      } else {
        setAlertMessage('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng: ' + errorMessage);
        setShowErrorAlert(true);
      }
    }
  }, [addToCart, isAuthenticated]);

  return (
    <>
      <div className="product-page">
        <div className="section-heading section-heading--center">
          <h1>Nhân sâm Hàn Quốc</h1>
          <p className="section-heading__description">
            Sản phẩm nhân sâm Hàn Quốc chính hãng, chất lượng cao
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-card__image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__name">{product.name}</h3>
                {product.description && (
                  <p className="product-card__description">{product.description}</p>
                )}
                <div className="product-card__footer">
                  <div className="product-card__price">
                    {product.price.toLocaleString('vi-VN')} ₫
                  </div>
                  <button
                    type="button"
                    className="btn btn--primary product-card__add-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Confirm Dialog */}
      <ConfirmDialog
        isOpen={showLoginConfirm}
        onClose={() => {
          setShowLoginConfirm(false);
          setAlertMessage('');
        }}
        onConfirm={() => {
          setShowLoginConfirm(false);
          setAlertMessage('');
          navigate('/dang-nhap');
        }}
        title="Yêu cầu đăng nhập"
        message={alertMessage || 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Bạn có muốn đăng nhập ngay không?'}
        confirmText="Đăng nhập"
        cancelText="Hủy"
        type="info"
      />

      {/* Success Alert */}
      <AlertDialog
        isOpen={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        message="Đã thêm sản phẩm vào giỏ hàng!"
        type="success"
        confirmText="OK"
      />

      {/* Error Alert */}
      <AlertDialog
        isOpen={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        message={alertMessage}
        type="error"
        confirmText="Đóng"
      />
    </>
  );
}
