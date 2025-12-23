import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { AlertDialog } from '../components/Modal';

interface ValidationError {
  field: string;
  message: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setFieldErrors({});
    setShowErrorAlert(false);

    const formData = new FormData(event.currentTarget);

    try {
      const payload = {
        username: (formData.get('username') as string).trim(),
        phone: (formData.get('phone') as string).trim(),
        address: (formData.get('address') as string).trim(),
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string
      };

      const result = await register(payload);
      setAuth(result.user, result.token);
      setStatus('success');
      // Điều hướng sau khi đăng ký thành công
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (err: any) {
      setStatus('error');
      
      console.log('Register error:', {
        status: err?.response?.status,
        data: err?.response?.data,
        details: err?.response?.data?.details
      });
      
      // Xử lý lỗi validation từ server (422) hoặc duplicate (409)
      const details = err?.response?.data?.details;
      
      if (Array.isArray(details) && details.length > 0) {
        const errors: Record<string, string> = {};
        details.forEach((error: ValidationError) => {
          const fieldName = error.field === 'confirmPassword' ? 'confirmPassword' : error.field;
          errors[fieldName] = error.message;
        });
        setFieldErrors(errors);
        
        // Hiển thị alert với tất cả lỗi validation
        const errorMessages = details.map((e: ValidationError) => `• ${e.message}`).join('\n');
        setErrorMessage(errorMessages);
        setShowErrorAlert(true);
      } else {
        // Lỗi khác (500, network error, etc.)
        const message =
          err?.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại.';
        setErrorMessage(message);
        setShowErrorAlert(true);
      }
    }
  }

  return (
    <div className="auth auth--register">
      <h1>Đăng ký tài khoản</h1>
      <p>Đăng ký để quản lý đơn hàng và nhận ưu đãi dành riêng cho bạn.</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label>
          Tên đăng nhập
          <input 
            name="username" 
            required 
            minLength={3}
            maxLength={50}
            className={fieldErrors.username ? 'auth__input--error' : ''}
          />
          {fieldErrors.username && (
            <span className="auth__field-error">{fieldErrors.username}</span>
          )}
        </label>
        <label>
          Số điện thoại
          <input 
            name="phone" 
            required 
            className={fieldErrors.phone ? 'auth__input--error' : ''}
          />
          {fieldErrors.phone && (
            <span className="auth__field-error">{fieldErrors.phone}</span>
          )}
        </label>
        <label>
          Địa chỉ
          <input 
            name="address" 
            required 
            className={fieldErrors.address ? 'auth__input--error' : ''}
          />
          {fieldErrors.address && (
            <span className="auth__field-error">{fieldErrors.address}</span>
          )}
        </label>
        <label>
          Mật khẩu
          <input 
            name="password" 
            type="password" 
            required 
            minLength={6}
            className={fieldErrors.password ? 'auth__input--error' : ''}
          />
          {fieldErrors.password && (
            <span className="auth__field-error">{fieldErrors.password}</span>
          )}
        </label>
        <label>
          Xác nhận mật khẩu
          <input 
            name="confirmPassword" 
            type="password" 
            required 
            minLength={6}
            className={fieldErrors.confirmPassword ? 'auth__input--error' : ''}
          />
          {fieldErrors.confirmPassword && (
            <span className="auth__field-error">{fieldErrors.confirmPassword}</span>
          )}
        </label>
        <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </form>

      {/* Error Alert Dialog */}
      <AlertDialog
        isOpen={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        message={errorMessage || 'Đăng ký thất bại, vui lòng thử lại.'}
        type="error"
        confirmText="Đóng"
      />
    </div>
  );
}


