import Modal from './Modal';
import { contactInfo } from '../data/mockContent';
import type { Product } from '../services/api';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  if (!product) return null;

  const displayPrice = product.isPromotion && product.promotionPrice 
    ? product.promotionPrice 
    : product.price;

  // Tạo mô tả chi tiết dựa trên tên sản phẩm
  const getDetailedDescription = (product: Product): string => {
    const name = product.name.toLowerCase();
    
    if (name.includes('cao hồng sâm') || name.includes('365')) {
      return `Cao Hồng Sâm Hàn Quốc 365 là sản phẩm cao cấp được chiết xuất từ nhân sâm 6 năm tuổi, được chế biến theo công nghệ hiện đại của Hàn Quốc. Sản phẩm giúp:
      
• Tăng cường sức đề kháng, nâng cao thể trạng
• Bồi bổ cơ thể, giảm mệt mỏi, căng thẳng
• Hỗ trợ tuần hoàn máu, cải thiện trí nhớ
• Tăng cường sinh lực, cải thiện sức khỏe tổng thể
• Phù hợp cho người lao động trí óc, người cao tuổi

Xuất xứ: Hàn Quốc
Bảo quản: Nơi khô ráo, thoáng mát, tránh ánh sáng trực tiếp`;
    }
    
    if (name.includes('tinh chất') || name.includes('chiết xuất')) {
      return `Tinh chất Hồng Sâm Hàn Quốc là sản phẩm được chiết xuất tinh khiết từ nhân sâm 6 năm tuổi, chứa hàm lượng saponin cao. Sản phẩm mang lại nhiều lợi ích:

• Bổ sung năng lượng, giảm stress, mệt mỏi
• Tăng cường hệ miễn dịch, phòng chống bệnh tật
• Cải thiện tuần hoàn máu, hỗ trợ tim mạch
• Tăng cường trí nhớ, cải thiện khả năng tập trung
• Làm chậm quá trình lão hóa, duy trì sức khỏe

Cách dùng: Uống trực tiếp hoặc pha với nước ấm
Xuất xứ: Hàn Quốc`;
    }
    
    if (name.includes('nhân sâm tươi')) {
      return `Nhân Sâm Tươi Hàn Quốc được trồng và thu hoạch tại các vùng đất đỏ bazan của Hàn Quốc, nơi có điều kiện khí hậu và thổ nhưỡng lý tưởng. Sản phẩm có đặc điểm:

• Sâm tươi nguyên củ, giữ nguyên dưỡng chất tự nhiên
• Phù hợp để ngâm rượu, nấu canh, hầm gà
• Bổ khí, tăng cường sinh lực, cải thiện sức khỏe
• Tăng cường hệ miễn dịch, chống oxy hóa
• Hỗ trợ tiêu hóa, cải thiện chức năng gan

Cách sử dụng: Ngâm rượu, nấu canh, hầm với gà hoặc thịt
Bảo quản: Bọc kín, để trong ngăn mát tủ lạnh
Xuất xứ: Hàn Quốc`;
    }
    
    if (name.includes('viên')) {
      return `Viên bổ xương khớp là sản phẩm được nghiên cứu đặc biệt để hỗ trợ sức khỏe xương khớp. Sản phẩm có công dụng:

• Hỗ trợ giảm đau nhức xương khớp
• Tăng cường sức khỏe xương, phòng ngừa loãng xương
• Cải thiện độ linh hoạt và vận động
• Bổ sung canxi và các dưỡng chất cần thiết
• Phù hợp cho người cao tuổi, vận động viên

Thành phần: Chiết xuất từ các thảo dược tự nhiên
Cách dùng: Uống theo hướng dẫn trên bao bì
Xuất xứ: Hàn Quốc`;
    }
    
    // Mô tả mặc định
    return product.description || `Sản phẩm ${product.name} là sản phẩm cao cấp được nhập khẩu trực tiếp từ Hàn Quốc, đảm bảo chất lượng và độ an toàn. Sản phẩm được sản xuất theo tiêu chuẩn GMP và đã được kiểm định chất lượng.

• Sản phẩm chính hãng, có tem chống giả
• Được nhập khẩu trực tiếp từ Hàn Quốc
• Đảm bảo chất lượng và an toàn cho người sử dụng
• Hỗ trợ tăng cường sức khỏe tổng thể

Xuất xứ: Hàn Quốc
Bảo quản: Nơi khô ráo, thoáng mát`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
      <div className="product-detail">
        <div className="product-detail__image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="product-detail__placeholder">
              Chưa có hình ảnh
            </div>
          )}
        </div>
        
        <div className="product-detail__info">
          <div className="product-detail__price-section">
            {product.isPromotion && product.promotionPrice ? (
              <div className="product-detail__price">
                <span className="product-detail__price--old">
                  {product.price.toLocaleString('vi-VN')} ₫
                </span>
                <span className="product-detail__price--current">
                  {displayPrice.toLocaleString('vi-VN')} ₫
                </span>
                <span className="product-detail__badge">🎉 Khuyến mãi</span>
              </div>
            ) : (
              <div className="product-detail__price">
                <span className="product-detail__price--current">
                  {displayPrice.toLocaleString('vi-VN')} ₫
                </span>
              </div>
            )}
            {product.isFeatured && (
              <span className="product-detail__badge product-detail__badge--featured">
                ⭐ Sản phẩm nổi bật
              </span>
            )}
          </div>

          <div className="product-detail__description">
            <h3>Mô tả sản phẩm</h3>
            <div className="product-detail__description-text">
              {getDetailedDescription(product).split('\n').map((line, index) => (
                <p key={index}>{line.trim() || '\u00A0'}</p>
              ))}
            </div>
          </div>

          <div className="product-detail__contact">
            <h3>Thông tin liên hệ</h3>
            <div className="product-detail__contact-info">
              <div className="product-detail__contact-item">
                <strong>📞 Điện thoại:</strong>
                <a href={`tel:${contactInfo.phone.split(' ')[0]}`}>
                  {contactInfo.phone}
                </a>
              </div>
              <div className="product-detail__contact-item">
                <strong>📧 Email:</strong>
                <a href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>
              </div>
              <div className="product-detail__contact-item">
                <strong>📍 Địa chỉ:</strong>
                <span>{contactInfo.address}</span>
              </div>
            </div>
            <div className="product-detail__contact-note">
              <p>💬 Vui lòng liên hệ với chúng tôi để được tư vấn chi tiết về sản phẩm và đặt hàng.</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

