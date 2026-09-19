import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import useOrders from "../../hooks/useOrders";
import useToast from "../../hooks/useToast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import OrderItemRow from "../../components/orders/OrderItemRow";
import OrderTotals from "../../components/orders/OrderTotals";
import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import OrderTimeline from "../../components/orders/OrderTimeline";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { ROUTES } from "../../constants";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import { canCancelOrder } from "../../utils/orderStatus";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { fetchOrderById, cancelOrder } = useOrders();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchOrderById(id);
      setOrder(data);
      setLoading(false);
    };
    load();
  }, [id, fetchOrderById]);

  const handleCancel = async () => {
    setCancelDialogOpen(false);
    setActionLoading(true);
    const result = await cancelOrder(order.id);
    if (result.success) {
      setOrder(result.data);
      addToast({ type: "success", title: "Order cancelled." });
    } else {
      addToast({
        type: "error",
        title: "Cancellation failed",
        message: result.error,
      });
    }
    setActionLoading(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner text="Loading order..." />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <EmptyState
          title="Order not found"
          description="The order you are looking for does not exist."
          icon={Package}
          actionLabel="View My Orders"
          onAction={() => navigate(ROUTES.BUYER_ORDERS)}
        />
      </div>
    );
  }

  const cancellable = canCancelOrder(order.status);
  const items = order.items || [];
  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.unitPrice || 0) * Number(i.quantity || 0),
    0
  );

  return (
    <div className="p-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">
          Order <span className="text-primary">#{order.id}</span>
        </h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Order Items
            </h2>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <OrderItemRow key={idx} item={item} editable={false} />
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4">
              <OrderTotals items={items} />
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Status Timeline
            </h2>
            <OrderTimeline order={order} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Order Information
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted">Order ID</span>
                <span className="ml-2 text-text font-medium">{order.id}</span>
              </div>
              <div>
                <span className="text-muted">Date placed</span>
                <span className="ml-2 text-text font-medium">
                  {formatDateTime(order.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-muted">Current status</span>
                <span className="ml-2">
                  <OrderStatusBadge status={order.status} />
                </span>
              </div>
              <div>
                <span className="text-muted">Buyer</span>
                <span className="ml-2 text-text font-medium">
                  {order.buyerName}
                </span>
              </div>
              <div>
                <span className="text-muted">Farmer</span>
                <span className="ml-2 text-text font-medium">
                  {order.farmerName}
                </span>
              </div>
              <div>
                <span className="text-muted">Total</span>
                <span className="ml-2 text-text font-bold">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Delivery Information
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted">Delivery location</span>
                <span className="ml-2 text-text font-medium">
                  {order.deliveryLocation || "—"}
                </span>
              </div>
              <div>
                <span className="text-muted">Delivery notes</span>
                <p className="mt-1 text-text">
                  {order.deliveryNotes ? order.deliveryNotes : "—"}
                </p>
              </div>
            </div>
          </div>

          {cancellable && (
            <div className="pt-2">
              <ConfirmDialog
                isOpen={cancelDialogOpen}
                onClose={() => setCancelDialogOpen(false)}
                onConfirm={handleCancel}
                title="Cancel order?"
                description="Are you sure you want to cancel this order? This action cannot be undone."
                confirmLabel="Cancel Order"
                cancelLabel="Keep Order"
                variant="danger"
                isSubmitting={actionLoading}
              />
              <button
                onClick={() => setCancelDialogOpen(true)}
                className="w-full text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg py-2"
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
