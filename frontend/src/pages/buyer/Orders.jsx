import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useOrders from "../../hooks/useOrders";
import useToast from "../../hooks/useToast";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import { ROUTES } from "../../constants";
import { formatCurrency, formatDate } from "../../utils/formatters";

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const { orders, loading, error, fetchBuyerOrders } = useOrders();

  useEffect(() => {
    if (user?.id) {
      fetchBuyerOrders(user.id);
    }
  }, [user, fetchBuyerOrders]);

  useEffect(() => {
    if (error) {
      addToast({ type: "error", title: "Error", message: error });
    }
  }, [error, addToast]);

  const getItemSummary = (order) => {
    if (order.items && order.items.length > 0) {
      const names = order.items
        .slice(0, 2)
        .map((i) => i.productName);
      const extra = order.items.length - 2;
      return (
        <div>
          <p className="font-medium text-text">{names.join(", ")}</p>
          {extra > 0 && (
            <p className="text-xs text-muted">+{extra} more</p>
          )}
        </div>
      );
    }
    return <span className="text-muted">—</span>;
  };

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner text="Loading your orders..." />
      </div>
    );
  }

  return (
    <div className="p-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          title="You have no orders yet."
          description="Once you place an order, it will appear here so you can track its progress."
          icon={Package}
          actionLabel="Browse Marketplace"
          onAction={() => navigate(ROUTES.BUYER_MARKETPLACE)}
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text">{order.id}</span>
                  <span className="text-xs text-muted">•</span>
                  <span className="text-xs text-muted">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                {getItemSummary(order)}
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="font-medium text-text">
                    {order.items?.length || 0} item
                    {order.items?.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-sm font-bold text-primary">
                    {formatCurrency(order.totalAmount ?? order.total)}
                  </p>
                </div>
                <OrderStatusBadge status={order.status} />
                <Link
                  to={ROUTES.BUYER_ORDER_DETAILS.replace(":id", String(order.id))}
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  View Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
