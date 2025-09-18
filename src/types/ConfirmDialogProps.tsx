type Variant = "warning" | "danger" | "info" | "success";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: Variant;
  onConfirm: () => void;
  onClose: () => void;
}