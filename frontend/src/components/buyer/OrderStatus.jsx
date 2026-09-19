import Badge from "../common/Badge";
import { ORDER_STATUS, ORDER_STATUS_LABELS } from "../../constants";

const statusConfig = {
  [ORDER_STATUS.PENDING]: { label: "Awaiting Confirmation", variant: "pending" },
  [ORDER_STATUS.ACCEPTED]: { label: "Accepted", variant: "info" },
  [ORDER_STATUS.PROCESSING]: { label: "Processing", variant: "primary" },
  [ORDER_STATUS.READY]: { label: "Ready for Pickup", variant: "success" },
  [ORDER_STATUS.COMPLETED]: { label: "Completed", variant: "success" },
  [ORDER_STATUS.REJECTED]: { label: "Rejected", variant: "danger" },
  [ORDER_STATUS.CANCELLED]: { label: "Cancelled", variant: "danger" },
};

const BuyerOrderStatus = ({ order = {}, showProgress = false }) => {
  const config = statusConfig[order.status] || statusConfig[ORDER_STATUS.PENDING];

  if (!showProgress) {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="font-medium text-text">{order.id || "Order"}</p>
          <p className="text-sm text-muted">
            {(order.products?.length || order.items?.length || 0)} items
          </p>
        </div>
        <Badge variant={config.variant} dot>
          {config.label}
        </Badge>
      </div>
    );
  }

  const steps = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.ACCEPTED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.READY,
    ORDER_STATUS.COMPLETED,
  ];
  const currentIndex = steps.indexOf(order.status);
  const isTerminal = order.status === ORDER_STATUS.REJECTED || order.status === ORDER_STATUS.CANCELLED;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text">
          {config.label}
        </span>
        <Badge variant={config.variant} dot>
          {config.label}
        </Badge>
      </div>

      {isTerminal ? (
        <p className="text-xs text-muted mt-2">
          This order has been {ORDER_STATUS_LABELS[order.status].toLowerCase()}.
        </p>
      ) : (
        <div className="flex items-center gap-1">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded ${
                index <= Math.max(0, currentIndex)
                  ? "bg-primary"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerOrderStatus;
