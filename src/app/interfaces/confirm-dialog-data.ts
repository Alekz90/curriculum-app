export interface ConfirmDialogData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  iconCancel?: string;
  iconConfirm?: string;
  type?: 'danger' | 'warning' | 'info';
}