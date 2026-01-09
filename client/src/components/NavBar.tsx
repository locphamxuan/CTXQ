import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import logoImage from '../img/Stylized Logo with Interlocking \'X\' and \'Q\'.png';
import SearchBar from './SearchBar';

// Secret key để kích hoạt nút đăng nhập trên máy của chủ sở hữu
const OWNER_DEVICE_KEY = import.meta.env.VITE_OWNER_DEVICE_KEY || 'ctxq-owner-2026';
const OWNER_DEVICE_STORAGE_KEY = 'owner_device_enabled';

const links = [
  {
    to: '/san-pham/nhan-sam-han-quoc',
    label: 'Thực phẩm chức năng',
    subLinks: [
      { to: '/san-pham/nhan-sam-han-quoc', label: 'Nhân sâm Hàn Quốc' },
      { to: '/san-pham/my-pham-kbeauty', label: 'Mỹ phẩm K-Beauty' }
    ]
  },
  { to: '/linh-vuc/thoi-trang', label: 'Thời trang' },
  { to: '/linh-vuc/tu-van-thuong-mai', label: 'Tư vấn đầu tư' },
  { to: '/tin-tuc', label: 'Tin tức & Blog' },
  { to: '/lien-he', label: 'Liên hệ' }
];

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  
  // Kiểm tra nếu có secret key trong URL để kích hoạt device
  useEffect(() => {
    const secretKey = searchParams.get('key');
    if (secretKey === OWNER_DEVICE_KEY) {
      localStorage.setItem(OWNER_DEVICE_STORAGE_KEY, 'true');
      // Xóa key khỏi URL để không hiển thị trong address bar
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams]);
  
  // Chỉ hiển thị nút đăng nhập trên máy của chủ sở hữu
  const isOwnerDevice = localStorage.getItem(OWNER_DEVICE_STORAGE_KEY) === 'true';

  return (
    <header className="nav">
      <Link to="/san-pham/nhan-sam-han-quoc" className="nav__brand">
        <img src={logoImage} alt="CTY XQ" className="nav__logo-img" />
      </Link>
      <nav>
        <ul>
          {links.map((link) => (
            <li
              key={link.label}
              className={link.subLinks ? 'nav__item nav__item--dropdown' : 'nav__item'}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                {link.label}
              </NavLink>
              {link.subLinks && (
                <ul className="nav__dropdown">
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.label}>
                      <NavLink
                        to={subLink.to}
                        className={({ isActive }) =>
                          isActive ? 'nav__link nav__link--active' : 'nav__link'
                        }
                      >
                        {subLink.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav__search-container">
        <SearchBar />
      </div>
      <div className="nav__auth">
        {isAuthenticated && user?.isAdmin && (
          <NavLink to="/admin" className="nav__link">
            Admin
          </NavLink>
        )}
        {/* Chỉ hiển thị nút đăng nhập trên máy của chủ sở hữu */}
        {isOwnerDevice && (
          isAuthenticated ? (
            <button className="btn btn--secondary" onClick={logout} style={{ marginLeft: '0.5rem' }}>
              Đăng xuất
            </button>
          ) : (
            <NavLink 
              to="/dang-nhap" 
              className="btn btn--primary nav__login-btn"
            >
              Đăng nhập
            </NavLink>
          )
        )}
      </div>
    </header>
  );
}

