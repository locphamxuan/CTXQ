import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogPost } from '../services/api';
import type { BlogPost } from '../types/content';

const categoryLabels: Record<string, string> = {
  'sam-han-quoc': 'Sâm Hàn Quốc',
  'my-pham': 'Mỹ phẩm',
  'thoi-trang': 'Thời trang',
  'tu-van-thuong-mai': 'Tư vấn thương mại quốc tế'
};

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<(BlogPost & { content?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!id) {
        navigate('/tin-tuc');
        return;
      }

      try {
        setLoading(true);
        const foundPost = await fetchBlogPost(id);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          navigate('/tin-tuc');
        }
      } catch (err) {
        console.error('Error loading post:', err);
        navigate('/tin-tuc');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="blog-detail">
        <p>Đang tải bài viết...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-detail">
        <p>Không tìm thấy bài viết.</p>
        <button onClick={() => navigate('/tin-tuc')} className="btn btn--primary">
          Quay lại trang tin tức
        </button>
      </div>
    );
  }

  // Use content from backend if available, otherwise use summary
  const detailedContent = post?.content || post?.summary || 'Nội dung đang được cập nhật...';

  return (
    <div className="blog-detail">
      <button 
        onClick={() => navigate('/tin-tuc')} 
        className="blog-detail__back-btn"
      >
        ← Quay lại trang tin tức
      </button>

      <article className="blog-detail__article">
        <div className="blog-detail__header">
          <p className="badge blog-detail__badge">
            {categoryLabels[post.category] || post.category}
          </p>
          <h1 className="blog-detail__title">{post.title}</h1>
          <div className="blog-detail__meta">
            <span className="blog-detail__date">
              📅 {new Intl.DateTimeFormat('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).format(new Date(post.publishedAt))}
            </span>
          </div>
        </div>

        {post.image && (
          <div className="blog-detail__image">
            <img src={post.image} alt={post.title} />
          </div>
        )}

        <div className="blog-detail__content">
          {detailedContent.split('\n\n').map((paragraph, index) => {
            // Handle markdown-style headings
            if (paragraph.startsWith('## ')) {
              const text = paragraph.replace(/^##\s+/, '');
              return <h3 key={index} className="blog-detail__subheading">{text}</h3>;
            }
            if (paragraph.startsWith('### ')) {
              const text = paragraph.replace(/^###\s+/, '');
              return <h4 key={index} className="blog-detail__subheading-small">{text}</h4>;
            }
            // Handle bold text
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              const text = paragraph.replace(/\*\*/g, '');
              return <h3 key={index} className="blog-detail__subheading">{text}</h3>;
            }
            // Handle lists
            if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
              const items = paragraph.split('\n').filter(item => item.trim());
              return (
                <ul key={index} className="blog-detail__list">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^[-*]\s+/, '').replace(/\*\*/g, '')}</li>
                  ))}
                </ul>
              );
            }
            // Regular paragraph
            return (
              <p key={index} className="blog-detail__paragraph">
                {paragraph.replace(/\*\*/g, '')}
              </p>
            );
          })}
        </div>

        <div className="blog-detail__footer">
          <div className="blog-detail__contact">
            <h3>Liên hệ với chúng tôi</h3>
            <p>Bạn có câu hỏi về nội dung bài viết hoặc cần tư vấn thêm? Hãy liên hệ với chúng tôi!</p>
            <a href="/lien-he" className="btn btn--primary">
              Liên hệ ngay
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

