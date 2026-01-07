import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoImage from '../img/Stylized Logo with Interlocking \'X\' and \'Q\'.png';

const links = [
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
  const { isAuthenticated, user, logout } = useAuth();

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
      <div className="nav__auth">
        {isAuthenticated && user?.isAdmin && (
          <NavLink to="/admin" className="nav__link">
            Admin
          </NavLink>
        )}
        {isAuthenticated ? (
          <button className="btn btn--secondary" onClick={logout} style={{ marginLeft: '0.5rem' }}>
            Đăng xuất
          </button>
        ) : (
          <NavLink to="/dang-nhap" className="nav__link">
            Đăng nhập
          </NavLink>
        )}
      </div>
    </header>
  );
}

