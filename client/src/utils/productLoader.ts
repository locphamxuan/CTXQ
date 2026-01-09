import { ginsengProducts, type GinsengProduct } from '../data/ginsengProducts';
import { cosmeticsProducts, type CosmeticsProduct } from '../data/cosmeticsProducts';

// Import images for ginseng products
const ginsengImages = import.meta.glob('../img/sam han quoc/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

const getGinsengImage = (filename: string): string => {
  const path = `../img/sam han quoc/${filename}`;
  return ginsengImages[path] || '';
};

const ginsengImageMap: Record<string, string> = {
  'nam-linh-chi-sung-huou-dau-mua': getGinsengImage('Nấm linh chi Sừng hươu đầu mùa.png'),
  'tinh-dau-thong-do-han-quoc-kwangdong': getGinsengImage('TINH DẦU THÔNG ĐỎ HÀN QUỐC KwangDong.png'),
  'chiet-suat-dong-trung-ha-thao-hop-60-goi': getGinsengImage('Chiết suất đông trùng hạ thảo hộp 60 gói cao cấp.png'),
  'tinh-chat-hong-sam-mat-ong-pha-san-kgc-honey-paste': getGinsengImage('Tinh Chất Hồng Sâm Mật Ong Pha Sẵn KGC  Honey Paste (Hộp 30 gói).png'),
  'kgc-hong-sam-tonic-mild': getGinsengImage('KGC - Hồng sâm Tonic mild date 11-2028.png'),
  'dong-trung-ha-thao-nuoc-go-vang-60-goi': getGinsengImage('ĐÔNG TRÙNG HẠ THẢO NƯỚC GỖ VÀNG 60 GÓI.png'),
  'an-cung-nguu-hoang-hoan-dong-nhan-duong': getGinsengImage('An Cung Ngưu Hoàng Hoàn Đồng Nhân Đường.png'),
  'tinh-chat-dong-trung-sam-nui-cao-cap-han-quoc': getGinsengImage('TINH CHẤT ĐÔNG TRÙNG – SÂM NÚI CAO CẤP HÀN QUỐC.png'),
  'cao-sam-hoang-hau-han-quoc': getGinsengImage('CAO SÂM HOÀNG HẬU HÀN QUỐC(1).png'),
  'bo-nao-tram-huong-samsung-jangsoo-hwam': getGinsengImage('Bổ não trầm hương samsung jangsoo hwam.png'),
  'an-cung-rong-vang-daehan-jinbodan': getGinsengImage('AN CUNG RỒNG VÀNG DAEHAN JINBODAN.png'),
  'vien-uong-duong-nao-ong-quan': getGinsengImage('Viên uống dưỡng não ông quan.png')
};

// Import images for cosmetics products
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

const cosmeticsImageMap: Record<string, string> = {
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

const STORAGE_KEY = 'admin_products_override';

type ProductOverride = {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  sourceType: 'ginseng' | 'cosmetics';
  deleted?: boolean;
};

// Load overrides from localStorage
function loadOverrides(): Record<string, ProductOverride> {
  const savedOverrides = localStorage.getItem(STORAGE_KEY);
  if (!savedOverrides) return {};
  
  try {
    return JSON.parse(savedOverrides);
  } catch {
    return {};
  }
}

// Get ginseng products with overrides applied
export function getGinsengProducts(): GinsengProduct[] {
  const overrides = loadOverrides();
  const deletedIds = new Set<string>();
  
  // Collect deleted product IDs
  Object.values(overrides).forEach(override => {
    if (override.deleted && override.sourceType === 'ginseng') {
      deletedIds.add(override.id);
    }
  });

  // Load existing products from data files with overrides
  const existingProducts = ginsengProducts
    .filter(product => !deletedIds.has(product.id))
    .map(product => {
      const override = overrides[product.id];
      if (override && override.sourceType === 'ginseng' && !override.deleted) {
        // Apply override
        return {
          ...product,
          name: override.name,
          description: override.description,
          image: override.imageUrl || ginsengImageMap[product.id] || product.image
        };
      }
      // Use original with image from imageMap
      return {
        ...product,
        image: ginsengImageMap[product.id] || product.image
      };
    });

  // Add new products (not in original data files)
  const newProducts: GinsengProduct[] = Object.values(overrides)
    .filter(override => 
      override.sourceType === 'ginseng' && 
      !override.deleted && 
      !ginsengProducts.some(p => p.id === override.id)
    )
    .map(override => ({
      id: override.id,
      name: override.name,
      description: override.description,
      detailedDescription: override.description || 'Sản phẩm mới được thêm vào.',
      image: override.imageUrl || '',
      category: override.category || 'Sâm'
    }));

  return [...existingProducts, ...newProducts];
}

// Get cosmetics products with overrides applied
export function getCosmeticsProducts(): CosmeticsProduct[] {
  const overrides = loadOverrides();
  const deletedIds = new Set<string>();
  
  // Collect deleted product IDs
  Object.values(overrides).forEach(override => {
    if (override.deleted && override.sourceType === 'cosmetics') {
      deletedIds.add(override.id);
    }
  });

  // Load existing products from data files with overrides
  const existingProducts = cosmeticsProducts
    .filter(product => !deletedIds.has(product.id))
    .map(product => {
      const override = overrides[product.id];
      if (override && override.sourceType === 'cosmetics' && !override.deleted) {
        // Apply override
        return {
          ...product,
          name: override.name,
          description: override.description,
          image: override.imageUrl || cosmeticsImageMap[product.id] || product.image
        };
      }
      // Use original with image from imageMap
      return {
        ...product,
        image: cosmeticsImageMap[product.id] || product.image
      };
    });

  // Add new products (not in original data files)
  const newProducts: CosmeticsProduct[] = Object.values(overrides)
    .filter(override => 
      override.sourceType === 'cosmetics' && 
      !override.deleted && 
      !cosmeticsProducts.some(p => p.id === override.id)
    )
    .map(override => ({
      id: override.id,
      name: override.name,
      description: override.description,
      detailedDescription: override.description || 'Sản phẩm mới được thêm vào.',
      image: override.imageUrl || '',
      category: override.category || 'Mỹ phẩm'
    }));

  return [...existingProducts, ...newProducts];
}

// Get a single ginseng product by ID
export function getGinsengProductById(id: string): GinsengProduct | null {
  const products = getGinsengProducts();
  return products.find(p => p.id === id) || null;
}

// Get a single cosmetics product by ID
export function getCosmeticsProductById(id: string): CosmeticsProduct | null {
  const products = getCosmeticsProducts();
  return products.find(p => p.id === id) || null;
}

// Get image for a product
export function getProductImage(productId: string, sourceType: 'ginseng' | 'cosmetics'): string {
  const overrides = loadOverrides();
  const override = overrides[productId];
  
  if (override && override.imageUrl) {
    return override.imageUrl;
  }
  
  if (sourceType === 'ginseng') {
    return ginsengImageMap[productId] || '';
  } else {
    return cosmeticsImageMap[productId] || '';
  }
}

// Export image maps for use in other components
export { ginsengImageMap, cosmeticsImageMap };

