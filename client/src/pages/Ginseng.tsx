import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { ginsengProducts } from '../data/ginsengProducts';

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

export default function GinsengPage() {
  const navigate = useNavigate();

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
                src={imageMap[product.id] || product.image}
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
