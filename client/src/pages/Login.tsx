import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertDialog } from '../components/Modal';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth">
        <h1>Đăng nhập Admin</h1>
        <p>Vui lòng đăng nhập để quản lý sản phẩm</p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <label>
            Tên đăng nhập
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Nhập tên đăng nhập"
              disabled={loading}
            />
          </label>

          <label>
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu"
              disabled={loading}
            />
          </label>

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>

      <AlertDialog
        isOpen={showError}
        onClose={() => setShowError(false)}
        message={error}
        type="error"
        confirmText="Đóng"
      />
    </>
  );
}

