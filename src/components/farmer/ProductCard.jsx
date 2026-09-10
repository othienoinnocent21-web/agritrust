import { Eye } from "lucide-react";
import Badge from "../common/Badge";
import Rating from "../common/Rating";
import { formatCurrency, formatDate } from "../../utils/formatters";

const FarmerProductCard = ({
  product = {},
  showActions = true,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md">
      {product.images && product.images[0] && (
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-text">{product.title}</h3>
            <p className="text-sm text-muted mt-1">
              {formatCurrency(product.price)} / {product.unit}
            </p>
            <p className="text-sm text-muted mt-1">
              Qty: {product.quantity}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={product.isOrganic ? "success" : "default"}>
              {product.category}
            </Badge>
            <Badge variant={product.isAvailable ? "success" : "warning"} size="sm">
              {product.isAvailable ? "Available" : "Out of Stock"}
            </Badge>
          </div>
        </div>

        {product.location && (
          <p className="text-xs text-muted mt-2">📍 {product.location}</p>
        )}

        {product.createdAt && (
          <p className="text-xs text-muted mt-1">
            Added: {formatDate(product.createdAt)}
          </p>
        )}

        {product.farmer && (
          <div className="flex items-center gap-2 mt-3">
            <Rating rating={product.farmer.rating || 0} readOnly size="sm" />
            <span className="text-xs text-muted">{product.farmer.name}</span>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 mt-4 pt-3 border-t border-border">
            {onView && (
              <button
                onClick={() => onView(product)}
                className="text-xs text-muted hover:text-text"
              >
                <Eye className="w-3 h-3 inline mr-1" />
                View
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(product)}
                className="text-xs text-primary hover:text-primary/80"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(product)}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerProductCard;
