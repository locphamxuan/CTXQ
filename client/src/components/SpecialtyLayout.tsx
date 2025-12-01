import SectionHeading from './SectionHeading';
import type { SpecialtyPageContent } from '../types/content';

type SpecialtyLayoutProps = {
  content: SpecialtyPageContent;
};

export default function SpecialtyLayout({ content }: SpecialtyLayoutProps) {
  const { hero, highlights, products, rituals, articles } = content;

  return (
    <div className="specialty">
      <section className="specialty__hero">
        <p className="specialty__hero-eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.description}</p>
        {hero.stats && (
          <div className="specialty__stats">
            {hero.stats.map((stat) => (
              <div key={stat.id}>
                <span>{stat.value}</span>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeading
          eyebrow="Điểm nổi bật"
          title="Cam kết chất lượng"
          align="center"
        />
        <ul className="specialty__highlights">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading
          eyebrow="Danh mục sản phẩm"
          title="Các lựa chọn tiêu biểu"
        />
        <div className="specialty__products">
          {products.map((product) => (
            <article key={product.id} className="specialty__product-card">
              <img src={product.image} alt={product.name} />
              <div>
                <p className="badge">{product.category}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                {product.benefits && (
                  <ul>
                    {product.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                )}
                {product.price && (
                  <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {rituals && (
        <section>
          <SectionHeading
            eyebrow="Hướng dẫn sử dụng"
            title="Routine chuẩn chuyên gia"
          />
          <div className="specialty__rituals">
            {rituals.map((ritual) => (
              <article key={ritual.title}>
                <h3>{ritual.title}</h3>
                <ol>
                  {ritual.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeading
          eyebrow="Kiến thức"
          title="Bài viết hữu ích"
          align="center"
        />
        <div className="specialty__articles">
          {articles.map((article) => (
            <article key={article.id}>
              {article.image && (
                <img src={article.image} alt={article.title} />
              )}
              <p className="badge">{article.category}</p>
              <h4>{article.title}</h4>
              <p>{article.summary}</p>
              <small>
                {new Intl.DateTimeFormat('vi-VN').format(
                  new Date(article.publishedAt)
                )}
              </small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

