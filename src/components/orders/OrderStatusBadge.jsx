import Badge from "../common/Badge";
import { ORDER_STATUS_LABELS } from "../../constants";
import { getStatusVariant } from "../../utils/orderStatus";

const OrderStatusBadge = ({ status, showDot = true, size = "md", className = "" }) => {
  const label = ORDER_STATUS_LABELS[status] || status;
  const variant = getStatusVariant(status);

  return (
    <Badge variant={variant} size={size} dot={showDot} className={className}>
      {label}
    </Badge>
  );
};

export default OrderStatusBadge;
