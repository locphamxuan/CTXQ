import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

export default function Modal({ isOpen, onClose, title, children, showCloseButton = true }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button className="modal-close" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        )}
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  confirmText?: string;
}

export function AlertDialog({ isOpen, onClose, title, message, type = 'info', confirmText = 'OK' }: AlertDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || (type === 'success' ? 'Thành công' : type === 'error' ? 'Lỗi' : 'Thông báo')} showCloseButton={false}>
      <div className={`alert-dialog alert-dialog--${type}`}>
        <p className="alert-dialog-message">{message}</p>
        <div className="alert-dialog-actions">
          <button className="btn btn--primary" onClick={onClose}>
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  type = 'warning'
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || 'Xác nhận'} showCloseButton={false}>
      <div className={`confirm-dialog confirm-dialog--${type}`}>
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-actions">
          <button className="btn btn--secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button className={`btn btn--${type === 'danger' ? 'danger' : 'primary'}`} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

