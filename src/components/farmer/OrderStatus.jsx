import Badge from "../common/Badge";
import { ORDER_STATUS } from "../../constants";
import { formatDateTime } from "../../utils/formatters";

const statusConfig = {
  [ORDER_STATUS.PENDING]: { label: "Pending", variant: "pending" },
  [ORDER_STATUS.ACCEPTED]: { label: "Accepted", variant: "info" },
  [ORDER_STATUS.PROCESSING]: { label: "Processing", variant: "primary" },
  [ORDER_STATUS.READY]: { label: "Ready for Pickup", variant: "success" },
  [ORDER_STATUS.COMPLETED]: { label: "Completed", variant: "success" },
  [ORDER_STATUS.REJECTED]: { label: "Rejected", variant: "danger" },
  [ORDER_STATUS.CANCELLED]: { label: "Cancelled", variant: "danger" },
};

const FarmerOrderStatus = ({ order = {}, showDetails = true }) => {
  const config = statusConfig[order.status] || statusConfig[ORDER_STATUS.PENDING];

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium text-text">{order.id || "Order"}</p>
        {showDetails && (
          <p className="text-sm text-muted">
            {order.products?.length || order.items?.length || 0} items •{" "}
            {formatDateTime(order.createdAt)}
          </p>
        )}
      </div>
      <Badge variant={config.variant} dot>
        {config.label}
      </Badge>
    </div>
  );
};

export default FarmerOrderStatus;
