import type { HeroContent } from '../types/content';

type HeroProps = {
  content: HeroContent;
};

type HeroDomain = {
  id: string;
  label: string;
  description: string;
  link?: string;
  dropdown?: { label: string; href: string }[];
};

const heroDomains: HeroDomain[] = [
  {
    id: 'functional-food',
    label: 'Thực phẩm chức năng',
    description: 'Bồi bổ – tăng miễn dịch',
    dropdown: [
      { label: 'Nhân sâm Hàn Quốc', href: '/san-pham/nhan-sam-han-quoc' },
      { label: 'Mỹ phẩm K-Beauty', href: '/san-pham/my-pham-kbeauty' }
    ]
  },
  {
    id: 'fashion',
    label: 'Thời trang',
    description: 'Lookbook & đồng phục',
    link: '/linh-vuc/thoi-trang'
  },
  {
    id: 'trade-consulting',
    label: 'Tư vấn đầu tư',
    description: 'Quản lý danh mục đầu tư',
    link: '/linh-vuc/tu-van-thuong-mai'
  }
];

export default function Hero({ content }: HeroProps) {
  return (
    <section className="hero">
      <div>
        <p className="hero__eyebrow">Đa ngành - Một hệ sinh thái</p>
        <h1>{content.headline}</h1>
        <p className="hero__subheadline">{content.subheadline}</p>
        <div className="hero__actions">
          <a href={content.ctaPrimary.href} className="btn btn--primary">
            {content.ctaPrimary.label}
          </a>
        </div>
        <div className="hero__domains">
          {heroDomains.map((domain) => {
            const Wrapper = domain.link ? 'a' : 'div';
            return (
              <Wrapper
                key={domain.id}
                href={domain.link}
                className={`hero__domain${
                  domain.dropdown ? ' hero__domain--dropdown' : ''
                }${domain.link ? ' hero__domain--link' : ''}`}
              >
                <div>
                  <h4>{domain.label}</h4>
                  <p>{domain.description}</p>
                </div>
                {domain.dropdown && (
                  <ul className="hero__domain-dropdown">
                    {domain.dropdown.map((item) => (
                      <li key={item.label}>
                        <a href={item.href}>{item.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
      <div className="hero__stats">
        {content.stats.map((stat) => (
          <div key={stat.id}>
            <span>{stat.value}</span>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

