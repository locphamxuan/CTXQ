import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertDialog, ConfirmDialog } from '../components/Modal';
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
  'chiet-suat-dong-trung-ha-thao-hop-60-goi': getGinsengImage('Chiết xuất đông trùng hạ thảo hộp 60 gói cao cấp.png'),
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

type AdminProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  sourceType: 'ginseng' | 'cosmetics';
  deleted?: boolean;
};

const STORAGE_KEY = 'admin_products_override';

export default function AdminDashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Sâm',
    imageUrl: ''
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // ProtectedRoute component will handle redirect, but we still check here for safety
    if (!isAuthenticated || !user?.isAdmin) {
      return;
    }
    loadProducts();
  }, [isAuthenticated, user]);

  const loadProducts = () => {
    try {
      setLoading(true);
      
      // Load từ data files với hình ảnh từ imageMap
      const ginsengList: AdminProduct[] = ginsengProducts.map((p: GinsengProduct) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        category: 'Sâm',
        imageUrl: ginsengImageMap[p.id] || p.image || '',
        sourceType: 'ginseng' as const
      }));

      const cosmeticsList: AdminProduct[] = cosmeticsProducts.map((p: CosmeticsProduct) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        category: 'Mỹ phẩm',
        imageUrl: cosmeticsImageMap[p.id] || p.image || '',
        sourceType: 'cosmetics' as const
      }));

      // Load overrides từ localStorage (sản phẩm đã được chỉnh sửa/thêm)
      const savedOverrides = localStorage.getItem(STORAGE_KEY);
      let overrides: Record<string, AdminProduct> = {};
      if (savedOverrides) {
        try {
          overrides = JSON.parse(savedOverrides);
        } catch (e) {
          console.error('Error parsing saved products:', e);
        }
      }

      // Merge: lấy từ overrides nếu có, nếu không thì lấy từ data files
      // Loại bỏ các sản phẩm đã bị xóa
      const allProducts = [...ginsengList, ...cosmeticsList]
        .map(product => {
          const override = overrides[product.id];
          // Nếu có override và bị xóa, bỏ qua
          if (override && override.deleted) {
            return null;
          }
          return override || product;
        })
        .filter((p): p is AdminProduct => p !== null);

      // Thêm các sản phẩm mới (không có trong data files và chưa bị xóa)
      const newProducts = Object.values(overrides).filter(
        p => !p.deleted && !allProducts.some(ap => ap.id === p.id)
      );

      setProducts([...allProducts, ...newProducts]);
    } catch (err) {
      showAlertMessage('Không thể tải danh sách sản phẩm', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveProducts = (updatedProducts: AdminProduct[]) => {
    // Lưu các sản phẩm đã chỉnh sửa/thêm vào localStorage
    const overrides: Record<string, AdminProduct> = {};
    
    // Chỉ lưu những sản phẩm đã được chỉnh sửa hoặc thêm mới
    updatedProducts.forEach(product => {
      const originalGinseng = ginsengProducts.find(p => p.id === product.id);
      const originalCosmetics = cosmeticsProducts.find(p => p.id === product.id);
      const original = originalGinseng || originalCosmetics;
      
      // Nếu là sản phẩm mới hoặc đã được chỉnh sửa
      if (!original || 
          original.name !== product.name ||
          original.description !== product.description ||
          original.image !== product.imageUrl) {
        overrides[product.id] = product;
      }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('productsUpdated'));
  };

  const showAlertMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Sâm',
      imageUrl: ''
    });
    setUploadedImage(null);
    setImagePreview(null);
    setEditingProduct(null);
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category,
      imageUrl: product.imageUrl || ''
    });
    setUploadedImage(null);
    setImagePreview(product.imageUrl || null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      showAlertMessage('Vui lòng chọn file hình ảnh', 'error');
      return;
    }

    // Kiểm tra kích thước file (tối đa 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showAlertMessage('Kích thước file không được vượt quá 5MB', 'error');
      return;
    }

    // Đọc file và convert sang base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setUploadedImage(base64String);
      setImagePreview(base64String);
      // Xóa URL nếu đã upload file
      setFormData({ ...formData, imageUrl: '' });
    };
    reader.onerror = () => {
      showAlertMessage('Lỗi khi đọc file', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setFormData({ ...formData, imageUrl: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ưu tiên sử dụng hình ảnh đã upload, nếu không thì dùng URL
      const imageUrl = uploadedImage || formData.imageUrl || '';

      if (editingProduct) {
        // Cập nhật sản phẩm
        const updatedProducts = products.map(p => 
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                description: formData.description,
                category: formData.category,
                imageUrl: imageUrl
              }
            : p
        );
        setProducts(updatedProducts);
        saveProducts(updatedProducts);
        showAlertMessage('Cập nhật sản phẩm thành công!');
      } else {
        // Thêm sản phẩm mới
        const newProduct: AdminProduct = {
          id: `new-${Date.now()}`,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          imageUrl: imageUrl,
          sourceType: formData.category === 'Sâm' ? 'ginseng' : 'cosmetics'
        };
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        saveProducts(updatedProducts);
        showAlertMessage('Thêm sản phẩm thành công!');
      }

      resetForm();
    } catch (err: any) {
      showAlertMessage('Có lỗi xảy ra', 'error');
    }
  };

  const handleDelete = () => {
    if (!productToDelete) return;

    try {
      // Xóa sản phẩm khỏi danh sách
      const updatedProducts = products.filter(p => p.id !== productToDelete);
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
      
      showAlertMessage('Xóa sản phẩm thành công!');
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    } catch (err: any) {
      showAlertMessage('Có lỗi xảy ra', 'error');
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  // ProtectedRoute will handle redirect, but show loading if not authenticated
  if (!isAuthenticated || !user?.isAdmin) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang kiểm tra quyền truy cập...</div>;
  }

  return (
    <>
      <div className="admin">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Quản lý Sản phẩm</h1>
          <button className="btn btn--secondary" onClick={() => { logout(); navigate('/'); }}>
            Đăng xuất
          </button>
        </div>

        <div className="admin__panel">
          <h2>{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <form className="admin__form" onSubmit={handleSubmit}>
            <div className="admin__form-row">
              <label>
                Tên sản phẩm *
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Danh mục *
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  style={{ padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(15, 40, 75, 0.2)' }}
                >
                  <option value="Sâm">Sâm</option>
                  <option value="Mỹ phẩm">Mỹ phẩm</option>
                </select>
              </label>
            </div>

            <label>
              Mô tả
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                style={{ padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(15, 40, 75, 0.2)', fontFamily: 'inherit' }}
              />
            </label>

            <div>
              <label>
                Hình ảnh sản phẩm
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#6d7685' }}>
                      Upload từ máy tính
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ 
                        width: '100%',
                        padding: '0.5rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(15, 40, 75, 0.2)',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center', color: '#6d7685', fontSize: '0.9rem' }}>hoặc</div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#6d7685' }}>
                      Nhập URL hình ảnh
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, imageUrl: e.target.value });
                        if (e.target.value) {
                          setImagePreview(e.target.value);
                          setUploadedImage(null);
                        } else {
                          setImagePreview(null);
                        }
                      }}
                      placeholder="https://example.com/image.jpg"
                      disabled={!!uploadedImage}
                      style={{
                        opacity: uploadedImage ? 0.6 : 1
                      }}
                    />
                  </div>
                  {imagePreview && (
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: '#6d7685' }}>Xem trước:</label>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          style={{
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.85rem',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: '100%',
                          maxWidth: '300px',
                          height: 'auto',
                          borderRadius: '10px',
                          border: '1px solid rgba(15, 40, 75, 0.2)',
                          objectFit: 'cover'
                        }}
                        onError={() => {
                          setImagePreview(null);
                          showAlertMessage('Không thể tải hình ảnh', 'error');
                        }}
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn--primary">
                {editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
              </button>
              {editingProduct && (
                <button type="button" className="btn btn--secondary" onClick={resetForm}>
                  Hủy
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin__panel" style={{ marginTop: '2rem' }}>
          <h2>Danh sách sản phẩm</h2>
          {loading ? (
            <p>Đang tải...</p>
          ) : products.length === 0 ? (
            <p>Chưa có sản phẩm nào</p>
          ) : (
            <div className="admin__table-wrapper">
              <table className="admin__table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        ) : (
                          <span style={{ color: '#6d7685' }}>Chưa có</span>
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        <button
                          className="admin__link-button"
                          onClick={() => handleEdit(product)}
                        >
                          Sửa
                        </button>
                        <button
                          className="admin__link-button admin__link-button--danger"
                          onClick={() => {
                            setProductToDelete(product.id);
                            setShowDeleteConfirm(true);
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa sản phẩm này?"
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />

      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
        type={alertType}
        confirmText="Đóng"
      />
    </>
  );
}

