import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";
import { ShoppingCart } from "lucide-react";
import { ORDER_STATUS_LABELS } from "../../constants";
import { getStatusVariant } from "../../utils/orderStatus";

const RecentOrders = ({
  orders = [],
  buyerColumn = false,
  onOrderClick,
  showViewAll = true,
  viewAllTo,
  className = "",
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getTotalQuantity = (order) => {
    if (order.items && order.items.length > 0) {
      return order.items.reduce((sum, p) => sum + (p.quantity || 0), 0);
    }
    if (order.products && order.products.length > 0) {
      return order.products.reduce((sum, p) => sum + (p.quantity || 0), 0);
    }
    return order.items || 0;
  };

  if (orders.length === 0) {
    return (
      <div className={className}>
        <EmptyState
          title="No orders yet"
          description="Orders will appear here once they start coming in."
          icon={ShoppingCart}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-text">Product</th>
              <th className="text-left py-3 px-4 font-medium text-text">
                {buyerColumn ? "Farmer" : "Buyer"}
              </th>
              <th className="text-center py-3 px-4 font-medium text-text">Qty</th>
              <th className="text-right py-3 px-4 font-medium text-text">Amount</th>
              <th className="text-center py-3 px-4 font-medium text-text">Status</th>
              <th className="text-right py-3 px-4 font-medium text-text">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  if (onOrderClick) onOrderClick(order);
                }}
              >
                <td className="py-3 px-4">
                  <div className="font-medium text-text">
                    {order.products?.[0]?.title || order.items?.[0]?.productName || "—"}
                  </div>
                  {(order.products?.length > 1 || order.items?.length > 1) && (
                    <span className="text-xs text-muted">
                      +{(order.products?.length || order.items?.length) - 1} more
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {buyerColumn ? order.farmer?.avatar : order.buyer?.avatar ? (
                      <img
                        src={buyerColumn ? order.farmer?.avatar : order.buyer?.avatar}
                        alt={buyerColumn ? order.farmer?.name : order.buyer?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                        {(buyerColumn ? order.farmer?.name : order.buyer?.name)?.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm">
                      {buyerColumn ? order.farmer?.name : order.buyer?.name}
                    </span>
                  </div>
                  {(buyerColumn ? order.farmer?.location : order.buyer?.location) && (
                    <span className="block text-xs text-muted mt-1">
                      {buyerColumn ? order.farmer?.location : order.buyer?.location}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center text-text">
                  {getTotalQuantity(order)}
                </td>
                <td className="py-3 px-4 text-right font-medium">
                  ${order.totalAmount ?? order.total}
                </td>
                <td className="py-3 px-4 text-center">
                  <Badge variant={getStatusVariant(order.status)} size="sm" dot>
                    {ORDER_STATUS_LABELS[order.status] || order.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right text-muted">
                  {formatDate(order.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showViewAll && viewAllTo && (
        <div className="mt-4 text-right">
          <Link
            to={viewAllTo}
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            View all orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
