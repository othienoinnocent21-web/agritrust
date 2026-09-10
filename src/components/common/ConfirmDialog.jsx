import { AlertTriangle } from "lucide-react";
import Button from "./Button";

const ConfirmDialog = ({
  isOpen,
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isSubmitting = false,
  loading = isSubmitting,
}) => {
  const isOpenProp = open ?? isOpen;
  if (!isOpenProp) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-text">{title}</h3>
            <p className="text-sm text-muted">{description}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
              {cancelLabel}
            </Button>
            <Button
              variant={variant}
              size="sm"
              onClick={onConfirm}
              disabled={loading}
              loading={loading}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
