import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoImage from '../img/Stylized Logo with Interlocking \'X\' and \'Q\'.png';

const links = [
  { to: '/', label: 'Trang chủ' },
  { to: '/gioi-thieu', label: 'Giới thiệu' },
  {
    to: '/san-pham/nhan-sam-han-quoc',
    label: 'Thực phẩm chức năng',
    subLinks: [
      { to: '/san-pham/nhan-sam-han-quoc', label: 'Nhân sâm Hàn Quốc' },
      { to: '/san-pham/my-pham-kbeauty', label: 'Mỹ phẩm K-Beauty' }
    ]
  },
  { to: '/linh-vuc/thoi-trang', label: 'Thời trang' },
  { to: '/linh-vuc/tu-van-thuong-mai', label: 'Tư vấn thương mại quốc tế' },
  { to: '/tin-tuc', label: 'Tin tức & Blog' },
  { to: '/lien-he', label: 'Liên hệ' }
];

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  // Lấy chữ cái đầu của username để hiển thị avatar
  const getInitials = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  return (
    <header className="nav">
      <Link to="/" className="nav__brand">
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
      <div className="nav__auth">
        {isAuthenticated && user ? (
          <div className="nav__user-menu" ref={dropdownRef}>
            <button
              className="nav__avatar"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="User menu"
            >
              <span className="nav__avatar-initials">{getInitials(user.username)}</span>
            </button>
            {showDropdown && (
              <div className="nav__user-dropdown">
                <div className="nav__user-info">
                  <div className="nav__user-name">{user.username}</div>
                  <div className="nav__user-phone">{user.phone}</div>
                </div>
                <NavLink
                  to="/ho-so"
                  className="nav__user-dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  Hồ sơ cá nhân
                </NavLink>
                <NavLink
                  to="/gio-hang"
                  className="nav__user-dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  Giỏ hàng
                </NavLink>
                <button
                  className="nav__user-dropdown-item nav__user-dropdown-item--logout"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/dang-nhap" className="nav__link">
              Đăng nhập
            </NavLink>
            <NavLink to="/dang-ky" className="nav__cta">
              Đăng ký
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

