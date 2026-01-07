import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { useBlog } from '../hooks/useContent';

const categories = [
  { id: '', label: 'Tất cả' },
  { id: 'sam-han-quoc', label: 'Sâm Hàn Quốc' },
  { id: 'my-pham', label: 'Mỹ phẩm' },
  { id: 'thoi-trang', label: 'Thời trang' },
  { id: 'tu-van-thuong-mai', label: 'Tư vấn thương mại quốc tế' }
];

const categoryLabels: Record<string, string> = {
  'sam-han-quoc': 'Sâm Hàn Quốc',
  'my-pham': 'Mỹ phẩm',
  'thoi-trang': 'Thời trang',
  'tu-van-thuong-mai': 'Tư vấn thương mại quốc tế'
};

export default function BlogPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const posts = useBlog(category || undefined);

  const handlePostClick = (postId: string) => {
    navigate(`/tin-tuc/${postId}`);
  };

  return (
    <div className="blog">
      <SectionHeading
        eyebrow="Tin tức & Blog"
        title="Tin tức mới nhất về các lĩnh vực"
        description="Cập nhật thường xuyên những thông tin mới nhất về sâm Hàn Quốc, mỹ phẩm, thời trang và tư vấn thương mại quốc tế."
        align="center"
      />
      <div className="blog__filters">
        {categories.map((item) => (
          <button
            key={item.id || 'all'}
            className={item.id === category ? 'chip chip--active' : 'chip'}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {posts.length === 0 ? (
        <div className="blog__empty">
          <p>Hiện chưa có bài viết trong danh mục này.</p>
          <p className="blog__empty-note">Tin tức sẽ được cập nhật tự động...</p>
        </div>
      ) : (
        <>
          <div className="blog__info">
            <p className="blog__update-info">
              📰 Đã cập nhật {posts.length} bài viết • Tự động làm mới mỗi 5 phút
            </p>
          </div>
          <div className="blog__grid">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="blog__post"
                onClick={() => handlePostClick(post.id)}
                style={{ cursor: 'pointer' }}
              >
                {post.image && (
                  <div className="blog__post-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                )}
                <div className="blog__post-content">
                  <p className="badge">
                    {categoryLabels[post.category] || post.category}
                  </p>
                  <h3>{post.title}</h3>
                  <p className="blog__post-summary">{post.summary}</p>
                  <small className="blog__post-date">
                    📅 {new Intl.DateTimeFormat('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(new Date(post.publishedAt))}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

