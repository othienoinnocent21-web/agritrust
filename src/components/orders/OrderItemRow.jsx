import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import { calculateItemSubtotal } from "../../utils/orderCalculations";
import Button from "../common/Button";

const OrderItemRow = ({
  item,
  editable = false,
  showAvailable = false,
  onQuantityChange,
  onRemove,
  className = "",
}) => {
  const qty = Number(item.quantity || 0);
  const available = Number(item.availableQuantity || item.quantity || 0);
  const canDecrease = qty > 1;
  const canIncrease = !showAvailable || qty < available;

  return (
    <div
      className={`flex items-center gap-4 py-3 ${
        editable ? "border-b border-border" : ""
      } ${className}`}
    >
      {item.productImage ? (
        <img
          src={item.productImage}
          alt={item.productName}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
          <span className="text-xs text-muted">No image</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-medium text-text">{item.productName}</p>
        <p className="text-sm text-muted mt-0.5">
          {formatCurrency(item.unitPrice)} / {item.unit}
        </p>
        {showAvailable && (
          <p className="text-xs text-muted">
            {available - qty} available of {available}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 w-32 justify-end">
        {editable ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              icon={Minus}
              disabled={!canDecrease}
              onClick={() => onQuantityChange(qty - 1)}
            />
            <span className="text-sm font-medium text-text w-8 text-center">
              {qty}
            </span>
            <Button
              variant="ghost"
              size="sm"
              icon={Plus}
              disabled={!canIncrease}
              onClick={() => onQuantityChange(qty + 1)}
            />
          </>
        ) : (
          <span className="text-sm font-medium text-text">{qty}</span>
        )}
      </div>

      <div className="w-24 text-right">
        <p className="font-medium text-text">
          {formatCurrency(item.subtotal ?? calculateItemSubtotal(item.unitPrice, item.quantity))}
        </p>
      </div>

      {editable && onRemove && (
        <Button
          variant="ghost"
          size="sm"
          icon={Trash2}
          className="text-red-600 hover:text-red-700"
          onClick={() => onRemove(item)}
          aria-label="Remove item"
        />
      )}
    </div>
  );
};

export default OrderItemRow;
