import { useEffect, useId } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

const Modal = ({
  isOpen,
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = "",
}) => {
  const isOpenProp = open ?? isOpen;
  const modalId = useId();
  const titleId = title ? `${modalId}-title` : undefined;

  useEffect(() => {
    if (!isOpenProp || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpenProp, closeOnEscape, onClose]);

  useEffect(() => {
    if (!isOpenProp) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpenProp]);

  if (!isOpenProp) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && onClose) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(
          "relative w-full bg-white rounded-lg shadow-xl",
          sizeClasses[size] || sizeClasses.md,
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 id={titleId} className="font-semibold text-lg text-text">
              {title}
            </h3>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted" />
              </button>
            )}
          </div>
        )}
        <div className="p-4 overflow-y-auto max-h-[70vh]">{children}</div>
        {footer && (
          <div className="p-4 border-t border-border bg-gray-50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
