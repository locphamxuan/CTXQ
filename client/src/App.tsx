import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/About';
import DomainsPage from './pages/Domains';
import BlogPage from './pages/Blog';
import BlogDetailPage from './pages/BlogDetail';
import ContactPage from './pages/Contact';
import GinsengPage from './pages/Ginseng';
import GinsengDetailPage from './pages/GinsengDetail';
import CosmeticsPage from './pages/Cosmetics';
import CosmeticsDetailPage from './pages/CosmeticsDetail';
import FashionPage from './pages/Fashion';
import ConsultingPage from './pages/Consulting';
import LoginPage from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/san-pham/nhan-sam-han-quoc" replace />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/linh-vuc" element={<DomainsPage />} />
          <Route path="/san-pham/nhan-sam-han-quoc" element={<GinsengPage />} />
          <Route path="/san-pham/nhan-sam-han-quoc/:id" element={<GinsengDetailPage />} />
          <Route path="/san-pham/my-pham-kbeauty" element={<CosmeticsPage />} />
          <Route path="/san-pham/my-pham-kbeauty/:id" element={<CosmeticsDetailPage />} />
          <Route path="/linh-vuc/thoi-trang" element={<FashionPage />} />
          <Route path="/linh-vuc/tu-van-thuong-mai" element={<ConsultingPage />} />
          <Route path="/tin-tuc" element={<BlogPage />} />
          <Route path="/tin-tuc/:id" element={<BlogDetailPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

