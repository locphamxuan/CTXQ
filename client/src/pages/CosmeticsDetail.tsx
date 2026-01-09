import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CosmeticsProduct } from '../data/cosmeticsProducts';
import { contactInfo } from '../data/mockContent';
import { getCosmeticsProductById } from '../utils/productLoader';

export default function CosmeticsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<CosmeticsProduct | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/san-pham/my-pham-kbeauty');
      return;
    }

    const foundProduct = getCosmeticsProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/san-pham/my-pham-kbeauty');
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  // Parse detailed description to format properly
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // Handle headings
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const text = paragraph.replace(/\*\*/g, '');
        return <h3 key={index} className="product-detail__subheading">{text}</h3>;
      }
      // Handle lists
      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        const items = paragraph.split('\n').filter(item => item.trim());
        return (
          <ul key={index} className="product-detail__list">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^[-*]\s+/, '').replace(/\*\*/g, '')}</li>
            ))}
          </ul>
        );
      }
      // Regular paragraph
      return (
        <p key={index} className="product-detail__paragraph">
          {paragraph.replace(/\*\*/g, '')}
        </p>
      );
    });
  };

  return (
    <div className="product-detail-page">
      <button
        onClick={() => navigate('/san-pham/my-pham-kbeauty')}
        className="product-detail-page__back-btn"
      >
        ← Quay lại trang mỹ phẩm
      </button>

      <div className="product-detail-page__container">
        <div className="product-detail-page__image-section">
          <div className="product-detail-page__image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>
        </div>

        <div className="product-detail-page__info-section">
          <div className="product-detail-page__header">
            <p className="badge product-detail-page__badge">{product.category}</p>
            <h1 className="product-detail-page__title">{product.name}</h1>
            <p className="product-detail-page__short-description">{product.description}</p>
          </div>

          <div className="product-detail-page__content">
            <h2 className="product-detail-page__content-title">Mô tả sản phẩm</h2>
            <div className="product-detail-page__detailed-content">
              {formatContent(product.detailedDescription)}
            </div>
          </div>

          <div className="product-detail-page__contact">
            <h3>Thông tin liên hệ</h3>
            <div className="product-detail-page__contact-info">
              <div className="product-detail-page__contact-item">
                <strong>📞 Điện thoại:</strong>
                <a href={`tel:${contactInfo.phone.split(' ')[0]}`}>
                  {contactInfo.phone}
                </a>
              </div>
              <div className="product-detail-page__contact-item">
                <strong>📧 Email:</strong>
                <a href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>
              </div>
              <div className="product-detail-page__contact-item">
                <strong>📍 Địa chỉ:</strong>
                <span>{contactInfo.address}</span>
              </div>
            </div>
            <div className="product-detail-page__contact-note">
              <p>💬 Vui lòng liên hệ với chúng tôi để được tư vấn chi tiết về sản phẩm và đặt hàng.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

