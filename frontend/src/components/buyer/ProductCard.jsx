import Badge from "../common/Badge";
import Rating from "../common/Rating";
import { formatCurrency } from "../../utils/formatters";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const BuyerProductCard = ({
  product = {},
  onFavorite,
  showFavorite = true,
  compact = false,
}) => {
  const isFavorited = product.isFavorited || false;

  return (
    <Link to={`/buyer/products/${product.id}`} className="block">
      <div className="bg-white border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md">
        {product.images && product.images[0] && (
          <img
            src={product.images[0]}
            alt={product.title}
            className={`object-cover ${
              compact ? "w-full h-32" : "w-full h-48"
            }`}
          />
        )}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-text">{product.title}</h3>
            {showFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onFavorite) {
                    onFavorite(product);
                  }
                }}
                className={`p-1 rounded-lg transition-colors ${
                  isFavorited
                    ? "text-red-600 bg-red-50"
                    : "text-muted hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={isFavorited ? "currentColor" : "none"}
                />
              </button>
            )}
          </div>

          <p className="text-lg font-bold text-primary mt-2">
            {formatCurrency(product.price)} / {product.unit}
          </p>

          {product.farmer && (
            <div className="flex items-center gap-2 mt-2">
              <Rating rating={product.farmer.rating || 0} readOnly size="sm" />
              <span className="text-xs text-muted">{product.farmer.name}</span>
            </div>
          )}

          {product.isOrganic && (
            <Badge variant="success" size="sm">
              Organic
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BuyerProductCard;
