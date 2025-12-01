import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { businessDomains } from '../data/mockContent';
import { useBlog } from '../hooks/useContent';

const categories = [
  { id: '', label: 'Tất cả' },
  ...businessDomains.map((domain) => ({ id: domain.id, label: domain.title }))
];

export default function BlogPage() {
  const [category, setCategory] = useState('');
  const posts = useBlog(category || undefined);

  return (
    <div className="blog">
      <SectionHeading
        eyebrow="Tin tức & Blog"
        title="Kiến thức thực tiễn cho 3 lĩnh vực"
        description="Phân loại rõ ràng giúp bạn dễ dàng tìm kiếm chủ đề quan tâm."
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
        <p>Hiện chưa có bài viết trong danh mục này.</p>
      ) : (
        <div className="blog__grid">
          {posts.map((post) => (
            <article key={post.id}>
              {post.image && <img src={post.image} alt={post.title} />}
              <p className="badge">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <small>
                {new Intl.DateTimeFormat('vi-VN').format(new Date(post.publishedAt))}
              </small>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

