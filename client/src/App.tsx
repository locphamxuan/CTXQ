import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import DomainsPage from './pages/Domains';
import BlogPage from './pages/Blog';
import ContactPage from './pages/Contact';
import GinsengPage from './pages/Ginseng';
import CosmeticsPage from './pages/Cosmetics';
import FashionPage from './pages/Fashion';
import ConsultingPage from './pages/Consulting';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/linh-vuc" element={<DomainsPage />} />
          <Route path="/san-pham/nhan-sam-han-quoc" element={<GinsengPage />} />
          <Route path="/san-pham/my-pham-kbeauty" element={<CosmeticsPage />} />
          <Route path="/linh-vuc/thoi-trang" element={<FashionPage />} />
          <Route path="/linh-vuc/tu-van-thuong-mai" element={<ConsultingPage />} />
          <Route path="/tin-tuc" element={<BlogPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/ho-so" element={<ProfilePage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="/thanh-toan" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

