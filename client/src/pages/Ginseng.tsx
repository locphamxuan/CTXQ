import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { getGinsengProducts } from '../utils/productLoader';
import type { GinsengProduct } from '../data/ginsengProducts';

export default function GinsengPage() {
  const navigate = useNavigate();
  const [ginsengProducts, setGinsengProducts] = useState<GinsengProduct[]>(getGinsengProducts());

  // Reload products when localStorage changes
  useEffect(() => {
    const handleProductsUpdate = () => {
      setGinsengProducts(getGinsengProducts());
    };

    // Listen for custom event when products are updated
    window.addEventListener('productsUpdated', handleProductsUpdate);
    
    // Listen for storage events (from other tabs/windows)
    window.addEventListener('storage', handleProductsUpdate);
    
    // Also check on focus (when user comes back to this tab)
    const handleFocus = () => {
      setGinsengProducts(getGinsengProducts());
    };
    window.addEventListener('focus', handleFocus);

    // Initial load
    setGinsengProducts(getGinsengProducts());

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
      window.removeEventListener('storage', handleProductsUpdate);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/san-pham/nhan-sam-han-quoc/${productId}`);
  };

  return (
    <div className="product-page">
      <SectionHeading
        eyebrow="Nhân sâm Hàn Quốc"
        title="Sản phẩm nhân sâm Hàn Quốc chính hãng"
        description="Các sản phẩm nhân sâm, hồng sâm và thực phẩm chức năng cao cấp từ Hàn Quốc"
        align="center"
      />

      <div className="product-grid">
        {ginsengProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="product-card__image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="product-card__content">
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__description">{product.description}</p>
              <div className="product-card__footer">
                <button
                  className="product-card__detail-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.id);
                  }}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
