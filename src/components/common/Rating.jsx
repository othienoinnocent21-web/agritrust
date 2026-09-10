import { useState } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

const Rating = ({
  rating = 0,
  maxRating = 5,
  readOnly = true,
  size = "md",
  showValue = false,
  reviewCount,
  onRate,
  className = "",
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  const isInteractive = !readOnly && typeof onRate === "function";
  const displayRating = isInteractive ? (hoverRating || rating) : rating;

  const getStarType = (index) => {
    const starValue = index + 1;
    if (starValue <= displayRating) return "full";
    if (starValue - 0.5 <= displayRating && displayRating < starValue)
      return "half";
    return "empty";
  };

  const handleStarClick = (index) => {
    if (isInteractive) {
      onRate(index + 1);
    }
  };

  const handleStarMouseEnter = (index) => {
    if (isInteractive) {
      setHoverRating(index + 1);
    }
  };

  const handleStarMouseLeave = () => {
    if (isInteractive) {
      setHoverRating(0);
    }
  };

  const starClassName = (type) =>
    clsx(
      "transition-colors",
      sizeClasses[size] || sizeClasses.md,
      type === "full" ? "text-amber-400" : "text-gray-300",
      isInteractive && "cursor-pointer",
      isInteractive && type === "full" && "hover:text-amber-500",
      isInteractive && type === "empty" && "hover:text-amber-200"
    );

  const renderStar = (type, index) => {
    const className = starClassName(type);
    if (type === "half") {
      return (
        <div key={`star-${index}`} className="relative">
          <Star className={className} />
          <Star
            className={className}
            style={{ clipPath: "inset(0 50% 0 0)" }}
            fill="currentColor"
          />
        </div>
      );
    }
    return (
      <Star
        key={`star-${index}`}
        className={className}
        fill={type === "full" ? "currentColor" : "none"}
      />
    );
  };

  return (
    <div
      className={clsx("flex items-center gap-1", className)}
      role={isInteractive ? "radiogroup" : "img"}
      aria-label={
        isInteractive ? "Rate this product" : `Rating: ${rating.toFixed(1)} out of ${maxRating}`
      }
    >
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarMouseEnter(index)}
            onMouseLeave={handleStarMouseLeave}
          >
            {renderStar(getStarType(index), index)}
          </div>
        ))}
      </div>
      {(showValue || reviewCount !== undefined) && (
        <div className="flex items-center gap-2">
          {showValue && (
            <span className="text-sm text-muted">{rating.toFixed(1)}</span>
          )}
          {reviewCount !== undefined && (
            <span className="text-sm text-muted">({reviewCount})</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Rating;
