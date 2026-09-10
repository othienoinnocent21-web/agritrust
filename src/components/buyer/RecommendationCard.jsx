import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/formatters";

const RecommendationCard = ({
  recommendation = {},
  onAddToCart,
  onFavorite,
}) => {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md">
      {recommendation.image && (
        <img
          src={recommendation.image}
          alt={recommendation.title}
          className="w-full h-32 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-text">{recommendation.title}</h3>
          {recommendation.score !== undefined && (
            <Badge variant="info" size="sm">
              {recommendation.score}%
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted mt-1 line-clamp-2">
          {recommendation.reason}
        </p>
        <p className="text-lg font-bold text-primary mt-2">
          {formatCurrency(recommendation.price)}
        </p>
        <div className="flex gap-2 mt-3">
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(recommendation)}
              className="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
            >
              Add to Cart
            </button>
          )}
          {onFavorite && (
            <button
              onClick={() => onFavorite(recommendation)}
              className="px-3 py-1.5 text-sm text-muted hover:text-red-600"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
