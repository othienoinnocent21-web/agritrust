import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";
import useFarmerId from "../../hooks/useFarmerId";
import useOrders from "../../hooks/useOrders";
import useToast from "../../hooks/useToast";
import SearchInput from "../../components/common/SearchInput";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import { ROUTES, ORDER_STATUS } from "../../constants";
import { formatCurrency, formatDate } from "../../utils/formatters";

const statusOptions = [
  { value: "", label: "All Status" },
  { value: ORDER_STATUS.PENDING, label: "Pending" },
  { value: ORDER_STATUS.ACCEPTED, label: "Accepted" },
  { value: ORDER_STATUS.PROCESSING, label: "Processing" },
  { value: ORDER_STATUS.READY, label: "Ready" },
  { value: ORDER_STATUS.COMPLETED, label: "Completed" },
  { value: ORDER_STATUS.REJECTED, label: "Rejected" },
  { value: ORDER_STATUS.CANCELLED, label: "Cancelled" },
];

const Orders = () => {
  const { addToast } = useToast();
  const farmerId = useFarmerId();
  const { orders, loading, error, fetchFarmerOrders } = useOrders();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (farmerId) {
      fetchFarmerOrders(farmerId);
    }
  }, [farmerId, fetchFarmerOrders]);

  useEffect(() => {
    if (error) {
      addToast({ type: "error", title: "Error", message: error });
    }
  }, [error, addToast]);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesSearch =
        !search ||
        String(order.id).toLowerCase().includes(search.toLowerCase()) ||
        (order.buyerName || "")
          .toLowerCase()
          .includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const hasActiveFilters = search || statusFilter;
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
  };

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner text="Loading orders..." />
      </div>
    );
  }

  return (
    <div className="p-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Incoming Orders</h1>
          <p className="text-muted mt-1">
            {filtered.length} order{filtered.length !== 1 ? "s" : ""} received.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID or buyer..."
          className="flex-1"
        />
        <div className="flex gap-2">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            placeholder="All Status"
            className="w-48"
          />
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={hasActiveFilters ? "No orders found" : "You have no incoming orders."}
          description={
            hasActiveFilters
              ? "Try adjusting your search or filter criteria."
              : "Orders placed by buyers for your products will appear here."
          }
          icon={ShoppingBasket}
          actionLabel={hasActiveFilters ? "Clear filters" : undefined}
          onAction={hasActiveFilters ? clearFilters : undefined}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
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
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted">Buyer:</span>
                  <span className="text-sm text-text">{order.buyerName}</span>
                </div>
                <div className="mt-1">
                  <p className="text-sm text-muted">
                    {order.items?.length || 0} item
                    {order.items?.length !== 1 ? "s" : ""}{" "}
                    • {formatCurrency(order.totalAmount ?? order.total)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <OrderStatusBadge status={order.status} />
                <Link
                  to={ROUTES.FARMER_ORDER_DETAILS.replace(":id", String(order.id))}
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
