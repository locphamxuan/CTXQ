import { Link, NavLink } from 'react-router-dom';

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
  return (
    <header className="nav">
      <Link to="/" className="nav__brand">
        <span className="nav__logo">CTY XQ</span>
        <span className="nav__tagline">Lifestyle Holdings</span>
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
      <NavLink to="/lien-he" className="nav__cta">
        Nhận tư vấn
      </NavLink>
    </header>
  );
}

