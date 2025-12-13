import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface ValidationError {
  field: string;
  message: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);

    try {
      const payload = {
        username: (formData.get('username') as string).trim(),
        password: formData.get('password') as string
      };

      const result = await login(payload);
      setAuth(result.user, result.token);
      navigate('/');
    } catch (err: any) {
      setStatus('error');
      
      // Xử lý lỗi validation từ server
      const details = err?.response?.data?.details;
      if (Array.isArray(details)) {
        const errors: Record<string, string> = {};
        details.forEach((error: ValidationError) => {
          errors[error.field] = error.message;
        });
        setFieldErrors(errors);
        
        // Hiển thị thông báo tổng hợp
        const firstError = details[0]?.message || 'Thông tin chưa hợp lệ';
        setErrorMessage(firstError);
      } else {
        const message =
          err?.response?.data?.message || 'Đăng nhập thất bại, vui lòng thử lại.';
        setErrorMessage(message);
      }
    }
  }

  return (
    <div className="auth auth--login">
      <h1>Đăng nhập</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label>
          Tên đăng nhập
          <input 
            name="username" 
            required 
            className={fieldErrors.username ? 'auth__input--error' : ''}
          />
          {fieldErrors.username && (
            <span className="auth__field-error">{fieldErrors.username}</span>
          )}
        </label>
        <label>
          Mật khẩu
          <input 
            name="password" 
            type="password" 
            required
            className={fieldErrors.password ? 'auth__input--error' : ''}
          />
          {fieldErrors.password && (
            <span className="auth__field-error">{fieldErrors.password}</span>
          )}
        </label>
        <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
        {status === 'error' && errorMessage && Object.keys(fieldErrors).length === 0 && (
          <p className="auth__error">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}


