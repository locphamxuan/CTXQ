import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ginsengProducts, type GinsengProduct } from '../data/ginsengProducts';
import { contactInfo } from '../data/mockContent';

// Import images using import.meta.glob to handle files with special characters
const images = import.meta.glob('../img/sam han quoc/*.png', { eager: true, as: 'url' }) as Record<string, string>;

// Helper function to get image by filename
const getImage = (filename: string): string => {
  const path = `../img/sam han quoc/${filename}`;
  return images[path] || '';
};

const imageMap: Record<string, string> = {
  'nam-linh-chi-sung-huou-dau-mua': getImage('Nấm linh chi Sừng hươu đầu mùa.png'),
  'tinh-dau-thong-do-han-quoc-kwangdong': getImage('TINH DẦU THÔNG ĐỎ HÀN QUỐC KwangDong.png'),
  'chiet-suat-dong-trung-ha-thao-hop-60-goi': getImage('Chiết suất đông trùng hạ thảo hộp 60 gói cao cấp.png'),
  'tinh-chat-hong-sam-mat-ong-pha-san-kgc-honey-paste': getImage('Tinh Chất Hồng Sâm Mật Ong Pha Sẵn KGC  Honey Paste (Hộp 30 gói).png'),
  'kgc-hong-sam-tonic-mild': getImage('KGC - Hồng sâm Tonic mild date 11-2028.png'),
  'dong-trung-ha-thao-nuoc-go-vang-60-goi': getImage('ĐÔNG TRÙNG HẠ THẢO NƯỚC GỖ VÀNG 60 GÓI.png'),
  'an-cung-nguu-hoang-hoan-dong-nhan-duong': getImage('An Cung Ngưu Hoàng Hoàn Đồng Nhân Đường.png'),
  'tinh-chat-dong-trung-sam-nui-cao-cap-han-quoc': getImage('TINH CHẤT ĐÔNG TRÙNG – SÂM NÚI CAO CẤP HÀN QUỐC.png'),
  'cao-sam-hoang-hau-han-quoc': getImage('CAO SÂM HOÀNG HẬU HÀN QUỐC(1).png'),
  'bo-nao-tram-huong-samsung-jangsoo-hwam': getImage('Bổ não trầm hương samsung jangsoo hwam.png'),
  'an-cung-rong-vang-daehan-jinbodan': getImage('AN CUNG RỒNG VÀNG DAEHAN JINBODAN.png'),
  'vien-uong-duong-nao-ong-quan': getImage('Viên uống dưỡng não ông quan.png')
};

export default function GinsengDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<GinsengProduct | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/san-pham/nhan-sam-han-quoc');
      return;
    }

    const foundProduct = ginsengProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/san-pham/nhan-sam-han-quoc');
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
        onClick={() => navigate('/san-pham/nhan-sam-han-quoc')}
        className="product-detail-page__back-btn"
      >
        ← Quay lại trang nhân sâm
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

