import { useState } from 'react';
import type { FormEvent } from 'react';
import { submitContact } from '../services/api';
import type { BusinessDomain, TailorServiceConfig } from '../types/content';

type Props = {
  domain: BusinessDomain;
};

function isTailorConfig(
  services: BusinessDomain['services']
): services is TailorServiceConfig {
  return Boolean(services && !Array.isArray(services) && 'formFields' in services);
}

export default function DomainCard({ domain }: Props) {
  const [tailorStatus, setTailorStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const tailorConfig = isTailorConfig(domain.services) ? domain.services : undefined;

  async function handleTailorSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tailorConfig) return;

    setTailorStatus('loading');
    const formData = new FormData(event.currentTarget);
    const detail = tailorConfig.formFields
      .map((field) => `${field.label}: ${formData.get(field.id) || ''}`)
      .join(' | ');

    try {
      await submitContact({
        fullName:
          (formData.get('contactName') as string) ||
          (formData.get('company') as string) ||
          'Khách hàng may đo',
        email: (formData.get('email') as string) || 'contact@multisector.vn',
        phone: undefined,
        message: `Yêu cầu đặt may (${domain.title}): ${detail}`
      });
      event.currentTarget.reset();
      setTailorStatus('success');
    } catch (err) {
      setTailorStatus('error');
    }
  }

  return (
    <article id={domain.id} className="domain-card">
      <div>
        <p className="domain-card__eyebrow">Lĩnh vực</p>
        <h3>{domain.title}</h3>
        <p>{domain.summary}</p>
        <div className="chips">
          {domain.quickLinks.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
      </div>

      {domain.products && (
        <div className="domain-card__grid">
          {domain.products.map((product) => (
            <div key={product.id} className="domain-card__item">
              <img src={product.image} alt={product.name} />
              <div>
                <h4>
                  {product.name}{' '}
                  {product.badge && <small className="badge">{product.badge}</small>}
                </h4>
                <p>{product.description}</p>
                {product.price && (
                  <p className="domain-card__price">
                    {product.price.toLocaleString('vi-VN')} đ
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {domain.collections && (
        <div className="domain-card__grid">
          {domain.collections.map((collection) => (
            <div key={collection.id} className="domain-card__item">
              <img src={collection.image} alt={collection.title} />
              <h4>{collection.title}</h4>
              <p>{collection.description}</p>
            </div>
          ))}
        </div>
      )}

      {Array.isArray(domain.services) && (
        <ul className="domain-card__list">
          {domain.services.map((service) => (
            <li key={service.id}>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      )}

      {tailorConfig && (
        <div className="domain-card__tailor">
          <div>
            <h4>Dịch vụ đặt may theo yêu cầu</h4>
            <ul>
              {tailorConfig.highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <form className="domain-card__form" onSubmit={handleTailorSubmit}>
            {tailorConfig.formFields.map((field) =>
              field.type === 'textarea' ? (
                <label key={field.id}>
                  {field.label}
                  <textarea name={field.id} rows={3} required />
                </label>
              ) : (
                <label key={field.id}>
                  {field.label}
                  <input name={field.id} type={field.type} required />
                </label>
              )
            )}
            <button type="submit" disabled={tailorStatus === 'loading'}>
              {tailorStatus === 'loading' ? 'Đang gửi...' : 'Đăng ký tư vấn'}
            </button>
            {tailorStatus === 'success' && (
              <p className="domain-card__status domain-card__status--success">
                Đã nhận yêu cầu. Chúng tôi sẽ liên hệ trong 24 giờ.
              </p>
            )}
            {tailorStatus === 'error' && (
              <p className="domain-card__status domain-card__status--error">
                Có lỗi xảy ra. Vui lòng thử lại.
              </p>
            )}
          </form>
        </div>
      )}

      {domain.experts && (
        <div className="domain-card__experts">
          {domain.experts.map((expert) => (
            <div key={expert.id}>
              <img src={expert.avatar} alt={expert.name} />
              <h4>{expert.name}</h4>
              <p>{expert.title}</p>
              <small>{expert.experience}</small>
            </div>
          ))}
        </div>
      )}

      {domain.blog && (
        <div className="domain-card__grid domain-card__grid--blog">
          {domain.blog.map((post) => (
            <div key={post.id}>
              <img src={post.image} alt={post.title} />
              <h4>{post.title}</h4>
              <small>{post.readingTime}</small>
            </div>
          ))}
        </div>
      )}

      {domain.insights && (
        <div className="domain-card__grid domain-card__grid--blog">
          {domain.insights.map((insight) => (
            <div key={insight.id}>
              <img src={insight.image} alt={insight.title} />
              <p className="badge">{insight.tag}</p>
              <h4>{insight.title}</h4>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

