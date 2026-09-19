import { formatCurrency } from "../../utils/formatters";

const OrderTotals = ({ items = [], totalItems, totalPrice, className = "" }) => {
  const computedItems =
    totalItems !== undefined
      ? totalItems
      : items.reduce((sum, i) => sum + Number(i.quantity || 0), 0);
  const computedTotal =
    totalPrice !== undefined
      ? totalPrice
      : items.reduce(
          (sum, i) => sum + Number(i.unitPrice || 0) * Number(i.quantity || 0),
          0
        );

  return (
    <div className={`space-y-2 text-sm ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-muted">Total items</span>
        <span className="text-text font-medium">{computedItems}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-text font-medium">Order total</span>
        <span className="text-lg font-bold text-primary">
          {formatCurrency(computedTotal)}
        </span>
      </div>
    </div>
  );
};

export default OrderTotals;
