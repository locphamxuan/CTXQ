import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/baseApi';
import { fetchProducts, type Product } from '../services/api';
import { AlertDialog, ConfirmDialog } from '../components/Modal';

export default function AdminDashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Sâm',
    imageUrl: '',
    inventory: '0',
    isFeatured: false,
    isPromotion: false,
    promotionPrice: '',
    status: 'active'
  });

  useEffect(() => {
    // ProtectedRoute component will handle redirect, but we still check here for safety
    if (!isAuthenticated || !user?.isAdmin) {
      return;
    }
    loadProducts();
  }, [isAuthenticated, user]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      showAlertMessage('Không thể tải danh sách sản phẩm', 'error');
    } finally {
      setLoading(false);
    }
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
      price: '',
      category: 'Sâm',
      imageUrl: '',
      inventory: '0',
      isFeatured: false,
      isPromotion: false,
      promotionPrice: '',
      status: 'active'
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl || '',
      inventory: product.inventory.toString(),
      isFeatured: product.isFeatured,
      isPromotion: product.isPromotion,
      promotionPrice: product.promotionPrice?.toString() || '',
      status: product.status
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        category: formData.category,
        imageUrl: formData.imageUrl || undefined,
        inventory: parseInt(formData.inventory) || 0,
        isFeatured: formData.isFeatured,
        isPromotion: formData.isPromotion,
        promotionPrice: formData.isPromotion && formData.promotionPrice 
          ? parseFloat(formData.promotionPrice) 
          : undefined,
        status: formData.status
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, payload);
        showAlertMessage('Cập nhật sản phẩm thành công!');
      } else {
        await api.post('/products', payload);
        showAlertMessage('Thêm sản phẩm thành công!');
      }

      resetForm();
      loadProducts();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Có lỗi xảy ra';
      showAlertMessage(message, 'error');
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await api.delete(`/products/${productToDelete}`);
      showAlertMessage('Xóa sản phẩm thành công!');
      setShowDeleteConfirm(false);
      setProductToDelete(null);
      loadProducts();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Có lỗi xảy ra';
      showAlertMessage(message, 'error');
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

            <div className="admin__form-row">
              <label>
                Giá (₫) *
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </label>
              <label>
                Tồn kho
                <input
                  type="number"
                  min="0"
                  value={formData.inventory}
                  onChange={(e) => setFormData({ ...formData, inventory: e.target.value })}
                />
              </label>
              <label>
                Trạng thái
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(15, 40, 75, 0.2)' }}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngừng bán</option>
                  <option value="out_of_stock">Hết hàng</option>
                </select>
              </label>
            </div>

            <label>
              URL hình ảnh
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </label>

            <div className="admin__form-row">
              <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                <span>Sản phẩm nổi bật</span>
              </label>
              <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={formData.isPromotion}
                  onChange={(e) => setFormData({ ...formData, isPromotion: e.target.checked })}
                />
                <span>Đang khuyến mãi</span>
              </label>
            </div>

            {formData.isPromotion && (
              <label>
                Giá khuyến mãi (₫)
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.promotionPrice}
                  onChange={(e) => setFormData({ ...formData, promotionPrice: e.target.value })}
                />
              </label>
            )}

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
                    <th>Giá</th>
                    <th>Tồn kho</th>
                    <th>Trạng thái</th>
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
                        {product.isPromotion && product.promotionPrice ? (
                          <>
                            <span style={{ textDecoration: 'line-through', color: '#6d7685', fontSize: '0.85rem' }}>
                              {product.price.toLocaleString('vi-VN')} ₫
                            </span>
                            <br />
                            <span style={{ color: '#d7263d', fontWeight: '600' }}>
                              {product.promotionPrice.toLocaleString('vi-VN')} ₫
                            </span>
                          </>
                        ) : (
                          <span>{product.price.toLocaleString('vi-VN')} ₫</span>
                        )}
                      </td>
                      <td>{product.inventory}</td>
                      <td>
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            backgroundColor:
                              product.status === 'active'
                                ? '#f0fdf4'
                                : product.status === 'out_of_stock'
                                ? '#fff5f5'
                                : '#f6f7fb',
                            color:
                              product.status === 'active'
                                ? '#0b8457'
                                : product.status === 'out_of_stock'
                                ? '#d7263d'
                                : '#6d7685'
                          }}
                        >
                          {product.status === 'active'
                            ? 'Hoạt động'
                            : product.status === 'out_of_stock'
                            ? 'Hết hàng'
                            : 'Ngừng bán'}
                        </span>
                      </td>
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

