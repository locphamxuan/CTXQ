import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cosmeticsProducts, type CosmeticsProduct } from '../data/cosmeticsProducts';
import { contactInfo } from '../data/mockContent';

// Import images
import img3WClinic from '../img/mi pham/3W Clinic Intensive UV Sunblock Cream SPF 50+ PA+++.jpg';
import imgAntiphlamine from '../img/mi pham/Antiphlamine Cooling Gel  Lotion (Dầu xoa bóp Hàn Quốc).jpg';
import imgBanobagiDarkSpot from '../img/mi pham/Banobagi Stem Cell Vitamin Mask – Whitening & Dark Spot Care.jpg';
import imgBanobagiToneUp from '../img/mi pham/BANOBAGI Stem Cell Vitamin Mask – Whitening & Tone Up.jpg';
import imgBanobagiAcne from '../img/mi pham/Banobagi Super Collagen Mask – Acne (Red Blemish).jpg';
import imgFoodaholic from '../img/mi pham/Foodaholic Collagen Natural Essence Mask.jpg';
import imgHatomugi from '../img/mi pham/Hatomugi Cleansing Lotion (Cleansing & Pore Clear).jpg';
import imgHimenaRed from '../img/mi pham/HIMENA Hong Sam Hanbang (Gói màu đỏ – Nhân sâm đỏ).jpg';
import imgHongSamYellow from '../img/mi pham/Hong Sam Hanbang (Gói màu vàng – Nhân sâm).jpg';
import imgMyGold from '../img/mi pham/My Gold Korea Red Ginseng Foam Cleansing.jpg';
import imgSlimming from '../img/mi pham/Slimming Hot Body Gel-Ecosy.jpg';
import imgVaselineBright from '../img/mi pham/Vaseline Healthy Bright Daily Brightening Lotion.jpg';
import imgVaselineWash from '../img/mi pham/Vaseline Total Moisture Body Wash.jpg';
import imgMinami from '../img/mi pham/Viên uống giảm cân Minami Healthy Foods.jpg';

const imageMap: Record<string, string> = {
  '3w-clinic-uv-sunblock': img3WClinic,
  'antiphlamine-cooling-gel': imgAntiphlamine,
  'banobagi-stem-cell-whitening-dark-spot': imgBanobagiDarkSpot,
  'banobagi-stem-cell-whitening-tone': imgBanobagiToneUp,
  'banobagi-super-collagen-acne': imgBanobagiAcne,
  'foodaholic-collagen-mask': imgFoodaholic,
  'hatomugi-cleansing-lotion': imgHatomugi,
  'himena-hong-sam-hanbang-red': imgHimenaRed,
  'hong-sam-hanbang-yellow': imgHongSamYellow,
  'my-gold-korea-red-ginseng-cleansing': imgMyGold,
  'slimming-hot-body-gel': imgSlimming,
  'vaseline-healthy-bright-lotion': imgVaselineBright,
  'vaseline-total-moisture-body-wash': imgVaselineWash,
  'minami-healthy-foods-weight-loss': imgMinami
};

export default function CosmeticsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<CosmeticsProduct | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/san-pham/my-pham-kbeauty');
      return;
    }

    const foundProduct = cosmeticsProducts.find(p => p.id === id);
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
              src={imageMap[product.id] || product.image}
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

