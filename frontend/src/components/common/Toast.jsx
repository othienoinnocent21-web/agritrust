import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import clsx from "clsx";

const toastTypeConfig = {
  success: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  error: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  warning: { icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  info: { icon: Info, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
};

const Toast = ({
  id,
  message,
  title,
  type = "info",
  duration = 5000,
  onClose,
  className = "",
}) => {
  const config = toastTypeConfig[type] || toastTypeConfig.info;
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, id]);

  return (
    <div
      className={clsx(
        "flex items-start gap-3 p-4 rounded-lg shadow-lg border max-w-sm w-full",
        config.bg,
        config.border,
        className
      )}
    >
      <Icon className={clsx("w-5 h-5 mt-0.5 flex-shrink-0", config.color)} />
      <div className="flex-1">
        {title && <p className="font-medium text-sm text-text">{title}</p>}
        <p className="text-sm text-muted">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={() => onClose(id)}
          className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <X className="w-3 h-3 text-muted" />
        </button>
      )}
    </div>
  );
};

export default Toast;
