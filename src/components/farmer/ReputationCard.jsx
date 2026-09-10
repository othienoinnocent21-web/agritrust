import Avatar from "../common/Avatar";
import Rating from "../common/Rating";
import Badge from "../common/Badge";

const ReputationCard = ({
  farmer = {},
  reviews = [],
  totalOrders = 0,
  responseRate = 0,
  responseTime = "",
  className = "",
}) => {
  return (
    <div className={`bg-white border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <Avatar
          src={farmer.avatar}
          name={farmer.name}
          size="lg"
          status={farmer.isVerified ? "online" : "offline"}
        />
        <div>
          <h3 className="font-bold text-text">{farmer.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Rating rating={farmer.rating || 0} readOnly />
            <span className="text-sm text-muted">
              ({reviews.length} reviews)
            </span>
          </div>
          {farmer.isVerified && (
            <Badge variant="success" size="sm">
              Verified
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-center">
        <div>
          <p className="text-2xl font-bold text-text">{reviews.length}</p>
          <p className="text-xs text-muted">Total Reviews</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-text">{totalOrders}</p>
          <p className="text-xs text-muted">Orders Completed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-text">{responseRate}%</p>
          <p className="text-xs text-muted">Response Rate</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-text">{responseTime}</p>
          <p className="text-xs text-muted">Avg Response Time</p>
        </div>
      </div>
    </div>
  );
};

export default ReputationCard;
