import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  fetchUsers,
  fetchMoneySources,
  createMoneySource,
  updateMoneySource,
  deleteMoneySource,
  fetchDailyReport,
  type MoneySource,
  type DailyReport
} from '../services/adminApi';

type TabKey = 'users' | 'sources' | 'report';

// Helper function để format ngày tháng theo timezone Việt Nam
function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Kiểm tra nếu date không hợp lệ
    if (isNaN(date.getTime())) {
      return dateString; // Trả về nguyên bản nếu không parse được
    }
    return date.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  } catch (err) {
    console.error('Error formatting date:', err, dateString);
    return dateString;
  }
}

export default function AdminDashboard() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Tất cả hooks phải được gọi trước khi có early return
  const [activeTab, setActiveTab] = useState<TabKey>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [sources, setSources] = useState<MoneySource[]>([]);
  const [reportDate, setReportDate] = useState<string>(() => {
    return new Date().toISOString().slice(0, 10);
  });
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [sourceForm, setSourceForm] = useState<{ id?: number; name: string; description: string }>({
    name: '',
    description: ''
  });

  // Kiểm tra quyền admin
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        navigate('/dang-nhap');
        return;
      }
      if (!user.isAdmin) {
        navigate('/');
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  // Hiển thị loading hoặc không hiển thị gì nếu chưa xác nhận quyền
  if (isLoading || !isAuthenticated || !user || !user.isAdmin) {
    return null;
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    loadUsers();
    loadSources();
    loadReport(reportDate);
  }, [isAuthenticated]);

  async function loadUsers() {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadSources() {
    try {
      const data = await fetchMoneySources();
      setSources(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadReport(dateIso: string) {
    try {
      setLoading(true);
      const data = await fetchDailyReport(dateIso);
      setReport(data);
      setErrorMessage('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Không thể tải báo cáo ngày');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSource(e: React.FormEvent) {
    e.preventDefault();
    if (!sourceForm.name.trim()) return;

    try {
      if (sourceForm.id) {
        const updated = await updateMoneySource(sourceForm.id, {
          name: sourceForm.name.trim(),
          description: sourceForm.description.trim()
        });
        setSources((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      } else {
        const created = await createMoneySource({
          name: sourceForm.name.trim(),
          description: sourceForm.description.trim()
        });
        setSources((prev) => [created, ...prev]);
      }

      setSourceForm({ id: undefined, name: '', description: '' });
    } catch (err) {
      console.error(err);
      alert('Không thể lưu nguồn tiền');
    }
  }

  async function handleDeleteSource(id: number) {
    if (!window.confirm('Bạn có chắc muốn xóa nguồn tiền này?')) return;
    try {
      await deleteMoneySource(id);
      setSources((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert('Không thể xóa nguồn tiền (có thể đang được dùng trong dòng tiền).');
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin">
        <h1>Admin</h1>
        <p>Vui lòng đăng nhập để truy cập trang quản trị.</p>
      </div>
    );
  }

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      <div className="admin__tabs">
        <button
          type="button"
          className={activeTab === 'users' ? 'admin__tab admin__tab--active' : 'admin__tab'}
          onClick={() => setActiveTab('users')}
        >
          Tài khoản
        </button>
        <button
          type="button"
          className={activeTab === 'sources' ? 'admin__tab admin__tab--active' : 'admin__tab'}
          onClick={() => setActiveTab('sources')}
        >
          Nguồn tiền
        </button>
        <button
          type="button"
          className={activeTab === 'report' ? 'admin__tab admin__tab--active' : 'admin__tab'}
          onClick={() => setActiveTab('report')}
        >
          Báo cáo ngày
        </button>
      </div>

      {activeTab === 'users' && (
        <section className="admin__panel">
          <h2>Danh sách tài khoản</h2>
          <p>Đây là danh sách các tài khoản người dùng. (Tạo tài khoản qua trang đăng ký.)</p>
          <div className="admin__table-wrapper">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên đăng nhập</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Vai trò</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      <span
                        className={
                          user.isAdmin
                            ? 'admin__role-badge admin__role-badge--admin'
                            : 'admin__role-badge admin__role-badge--user'
                        }
                      >
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td>{formatDateTime(user.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'sources' && (
        <section className="admin__panel">
          <h2>Nguồn tiền</h2>
          <form className="admin__form" onSubmit={handleSaveSource}>
            <div className="admin__form-row">
              <label>
                Tên nguồn tiền
                <input
                  name="name"
                  value={sourceForm.name}
                  onChange={(e) => setSourceForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </label>
              <label>
                Mô tả
                <input
                  name="description"
                  value={sourceForm.description}
                  onChange={(e) =>
                    setSourceForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
              </label>
            </div>
            <button type="submit" className="btn btn--primary">
              {sourceForm.id ? 'Cập nhật nguồn tiền' : 'Thêm nguồn tiền'}
            </button>
          </form>

          <div className="admin__table-wrapper">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên nguồn tiền</th>
                  <th>Mô tả</th>
                  <th>Ngày tạo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sources.map((source) => (
                  <tr key={source.id}>
                    <td>{source.id}</td>
                    <td>{source.name}</td>
                    <td>{source.description}</td>
                    <td>{formatDateTime(source.createdAt)}</td>
                    <td>
                      <button
                        type="button"
                        className="admin__link-button"
                        onClick={() =>
                          setSourceForm({
                            id: source.id,
                            name: source.name,
                            description: source.description || ''
                          })
                        }
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="admin__link-button admin__link-button--danger"
                        onClick={() => handleDeleteSource(source.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'report' && (
        <section className="admin__panel">
          <h2>Báo cáo thu chi theo ngày</h2>
          <div className="admin__filter-row">
            <label>
              Chọn ngày
              <input
                type="date"
                value={reportDate}
                onChange={(e) => {
                  const value = e.target.value;
                  setReportDate(value);
                  loadReport(value);
                }}
              />
            </label>
          </div>

          {loading && <p>Đang tải báo cáo...</p>}
          {errorMessage && <p className="admin__error">{errorMessage}</p>}

          {report && !loading && (
            <div className="admin__report">
              <div className="admin__report-cards">
                <div className="admin__report-card admin__report-card--income">
                  <h3>Tổng thu</h3>
                  <p>{report.totalIncome.toLocaleString('vi-VN')} ₫</p>
                  <small>
                    Bán hàng: {report.ordersIncome.toLocaleString('vi-VN')} ₫ + Thu khác:{' '}
                    {report.cashIn.toLocaleString('vi-VN')} ₫
                  </small>
                </div>
                <div className="admin__report-card admin__report-card--expense">
                  <h3>Tổng chi</h3>
                  <p>{report.totalExpense.toLocaleString('vi-VN')} ₫</p>
                  <small>Chi khác: {report.cashOut.toLocaleString('vi-VN')} ₫</small>
                </div>
                <div className="admin__report-card admin__report-card--net">
                  <h3>Lãi / Lỗ</h3>
                  <p>{report.net.toLocaleString('vi-VN')} ₫</p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}


