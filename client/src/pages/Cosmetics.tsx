import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { cosmeticsProducts } from '../data/cosmeticsProducts';

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

export default function CosmeticsPage() {
  const navigate = useNavigate();

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
