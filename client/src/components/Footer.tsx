import { Link } from 'react-router-dom';
import { contactInfo } from '../data/mockContent';
import logoImage from '../img/Stylized Logo with Interlocking \'X\' and \'Q\'.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link to="/san-pham/nhan-sam-han-quoc" style={{ display: 'inline-block', marginBottom: '1rem' }}>
          <img 
            src={logoImage} 
            alt="CTXQ" 
            style={{ 
              height: '50px', 
              width: 'auto',
              maxWidth: '150px'
            }} 
          />
        </Link>
        <h4 style={{ marginTop: '0.5rem' }}>CTXQ</h4>
        <div className="footer__contact">
          <p>
            <strong>Địa chỉ:</strong> {contactInfo.address}
          </p>
          <p>
            <strong>Điện thoại:</strong>{' '}
            <a href={`tel:${contactInfo.phone.split(' ')[0]}`}>{contactInfo.phone}</a>
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </p>
        </div>
      </div>
      <div>
        <h5>Liên kết nhanh</h5>
        <ul>
          <li>
            <Link to="/tin-tuc">Tin tức</Link>
          </li>
          <li>
            <Link to="/lien-he">Liên hệ</Link>
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
      </div>
    </footer>
  );
}

