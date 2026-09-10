import { Link } from "react-router-dom";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Rating from "../common/Rating";

const ProductCard = ({ product, showFarmer = true, actionLabel = "View Product", actionTo }) => {
  const mainImage = product.images?.[0];
  const productRating = product.farmer?.rating || product.rating;

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-muted">No image</span>
          </div>
        )}
        {product.isOrganic && (
          <Badge variant="success" size="sm" className="absolute top-2 left-2">
            Organic
          </Badge>
        )}
        {!product.isAvailable && (
          <Badge variant="warning" size="sm" className="absolute top-2 right-2">
            Out of stock
          </Badge>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-text mb-1">{product.title}</h3>
        {product.category && (
          <p className="text-xs text-muted mb-2">{product.category}</p>
        )}

        <div className="flex items-center justify-between mb-3 mt-auto">
          <div>
            <span className="font-bold text-text">${product.price}</span>
            <span className="text-sm text-muted"> / {product.unit}</span>
          </div>
          {productRating !== undefined && (
            <Rating rating={productRating} readOnly size="sm" />
          )}
        </div>

        {showFarmer && product.farmer && (
          <div className="flex items-center gap-2 mb-3">
            {product.farmer.avatar ? (
              <img
                src={product.farmer.avatar}
                alt={product.farmer.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                {product.farmer.name?.charAt(0)}
              </div>
            )}
            <span className="text-sm text-muted">{product.farmer.name}</span>
            {product.farmer.location && (
              <>
                <span className="text-xs text-muted">•</span>
                <span className="text-sm text-muted">{product.farmer.location}</span>
              </>
            )}
          </div>
        )}

        {(product.views || product.orderCount) && (
          <div className="flex gap-4 text-xs text-muted mt-auto">
            {product.views && <span>{product.views} views</span>}
            {product.orderCount && <span>{product.orderCount} orders</span>}
          </div>
        )}

        {actionTo && (
          <Link
            to={actionTo}
            className="mt-3 text-center text-sm font-medium text-primary hover:text-primary/80"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
