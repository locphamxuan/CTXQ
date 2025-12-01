import type { NewsItem } from '../types/content';

type Props = {
  items: NewsItem[];
};

export default function NewsTicker({ items }: Props) {
  if (!items.length) {
    return null;
  }
  return (
    <section className="news">
      <div className="news__header">
        <p>Tin tức & Ưu đãi</p>
        <a href="/tin-tuc">Xem tất cả →</a>
      </div>
      <div className="news__list">
        {items.map((item) => (
          <article key={item.id}>
            <span>{item.category}</span>
            <h4>{item.title}</h4>
            <small>
              {new Intl.DateTimeFormat('vi-VN').format(new Date(item.publishedAt))}
            </small>
          </article>
        ))}
      </div>
    </section>
  );
}

