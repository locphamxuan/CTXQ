import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h4>CTY XQ Holdings</h4>
        <p>Kết nối sức khỏe, phong cách và tài chính.</p>
        <form
          className="footer__newsletter"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            form.reset();
            alert('Cảm ơn bạn đã đăng ký nhận tin!');
          }}
        >
          <input type="email" placeholder="Email của bạn" required />
          <button type="submit">Đăng ký</button>
        </form>
      </div>
      <div>
        <h5>Liên kết nhanh</h5>
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/linh-vuc">Lĩnh vực</Link>
          </li>
          <li>
            <Link to="/tin-tuc">Tin tức</Link>
          </li>
          <li>
            <Link to="/lien-he">Liên hệ</Link>
          </li>
        </ul>
      </div>
      <div>
        <h5>Chính sách</h5>
        <ul>
          <li>
            <a href="/">Bảo mật</a>
          </li>
          <li>
            <a href="/">Điều khoản sử dụng</a>
          </li>
        </ul>
      </div>
      <div>
        <h5>Kết nối</h5>
        <div className="footer__socials">
          <a
            href="https://www.facebook.com/loccphamxuan?locale=vi_VN"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://zalo.me/0989024736"
            target="_blank"
            rel="noreferrer"
          >
            Zalo
          </a>
        </div>
        <small>© {new Date().getFullYear()} CTY XQ Holdings</small>
      </div>
    </footer>
  );
}

