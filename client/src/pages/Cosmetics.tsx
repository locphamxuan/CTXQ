import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { getCosmeticsProducts } from '../utils/productLoader';
import type { CosmeticsProduct } from '../data/cosmeticsProducts';

export default function CosmeticsPage() {
  const navigate = useNavigate();
  const [cosmeticsProducts, setCosmeticsProducts] = useState<CosmeticsProduct[]>(getCosmeticsProducts());

  // Reload products when localStorage changes
  useEffect(() => {
    const handleProductsUpdate = () => {
      setCosmeticsProducts(getCosmeticsProducts());
    };

    // Listen for custom event when products are updated
    window.addEventListener('productsUpdated', handleProductsUpdate);
    
    // Listen for storage events (from other tabs/windows)
    window.addEventListener('storage', handleProductsUpdate);
    
    // Also check on focus (when user comes back to this tab)
    const handleFocus = () => {
      setCosmeticsProducts(getCosmeticsProducts());
    };
    window.addEventListener('focus', handleFocus);

    // Initial load
    setCosmeticsProducts(getCosmeticsProducts());

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
      window.removeEventListener('storage', handleProductsUpdate);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/san-pham/my-pham-kbeauty/${productId}`);
  };

  return (
    <div className="product-page">
      <SectionHeading
        eyebrow="Mỹ phẩm K-Beauty"
        title="Sản phẩm mỹ phẩm Hàn Quốc chính hãng"
        description="Các sản phẩm mỹ phẩm K-Beauty cao cấp, được nhập khẩu trực tiếp từ Hàn Quốc"
        align="center"
      />

      <div className="product-grid">
        {cosmeticsProducts.map((product) => (
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
                  onClick={() => handleProductClick(product.id)}
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
