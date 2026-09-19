import Avatar from "../common/Avatar";
import Rating from "../common/Rating";
import Badge from "../common/Badge";

const FarmerCard = ({
  farmer = {},
  onMessage,
  showContact = true,
  variant: _variant = "default",
}) => {
  return (
    <div className="bg-white border border-border rounded-xl p-4 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3 mb-3">
        <Avatar src={farmer.avatar} name={farmer.name} size="md" />
        <div className="flex-1">
          <h3 className="font-semibold text-text">{farmer.name}</h3>
          <p className="text-sm text-muted">{farmer.location}</p>
        </div>
        {farmer.isVerified && (
          <Badge variant="success" size="sm">
            Verified
          </Badge>
        )}
      </div>

      {farmer.bio && (
        <p className="text-sm text-muted mb-3 line-clamp-2">{farmer.bio}</p>
      )}

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1">
          <Rating rating={farmer.rating || 0} readOnly size="sm" />
          <span className="text-xs text-muted">
            {farmer.reviewCount} reviews
          </span>
        </div>
        {farmer.productCount !== undefined && (
          <span className="text-xs text-muted">
            {farmer.productCount} products
          </span>
        )}
      </div>

      {showContact && onMessage && (
        <button
          onClick={() => onMessage(farmer)}
          className="w-full px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
        >
          Message Farmer
        </button>
      )}
    </div>
  );
};

export default FarmerCard;
