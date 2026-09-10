import { Package } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  title = "No data available",
  description = "There's nothing to show here yet.",
  icon: Icon = Package,
  actionLabel,
  onAction,
  action,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {Icon && <Icon className="w-8 h-8 text-muted" />}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-sm mb-4">{description}</p>
      {action && <div className="mb-4">{action}</div>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
