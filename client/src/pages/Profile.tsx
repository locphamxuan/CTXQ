import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile">
      <h1>Hồ sơ cá nhân</h1>
      <div className="profile__card">
        <div className="profile__section">
          <h2>Thông tin tài khoản</h2>
          <div className="profile__info">
            <div className="profile__info-item">
              <label>Tên đăng nhập:</label>
              <span>{user.username}</span>
            </div>
            <div className="profile__info-item">
              <label>Số điện thoại:</label>
              <span>{user.phone}</span>
            </div>
            <div className="profile__info-item">
              <label>Địa chỉ:</label>
              <span>{user.address}</span>
            </div>
            <div className="profile__info-item">
              <label>Ngày tham gia:</label>
              <span>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

