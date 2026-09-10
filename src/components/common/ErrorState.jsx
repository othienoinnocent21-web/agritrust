import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button";

const ErrorState = ({
  title = "Something went wrong",
  description,
  message = description || "An unexpected error occurred. Please try again.",
  onRetry,
  retryLabel = "Retry",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
        <p className="text-sm text-muted max-w-sm mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" leftIcon={RefreshCw} onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
