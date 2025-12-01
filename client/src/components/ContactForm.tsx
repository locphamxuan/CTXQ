import { useState } from 'react';
import type { FormEvent } from 'react';
import { submitContact } from '../services/api';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);

    try {
      await submitContact({
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        message: formData.get('message') as string
      });
      setStatus('success');
      event.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage('Không thể gửi thông tin, vui lòng thử lại.');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Họ & tên
        <input name="fullName" required placeholder="Nguyễn Văn A" />
      </label>
      <label>
        Email
        <input name="email" type="email" required placeholder="email@domain.com" />
      </label>
      <label>
        Số điện thoại
        <input name="phone" placeholder="(+84) 912 345 678" />
      </label>
      <label>
        Nhu cầu
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Mô tả nhu cầu sản phẩm/dịch vụ..."
        />
      </label>
      <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu'}
      </button>
      {status === 'success' && (
        <p className="contact-form__status contact-form__status--success">
          Cảm ơn bạn! Chúng tôi sẽ liên hệ trong 24h.
        </p>
      )}
      {status === 'error' && (
        <p className="contact-form__status contact-form__status--error">{errorMessage}</p>
      )}
    </form>
  );
}

