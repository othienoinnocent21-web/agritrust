import Avatar from "../common/Avatar";
import Rating from "../common/Rating";
import { Quote } from "lucide-react";

const TestimonialCard = ({
  name = "User Name",
  role = "Farmer",
  rating = 5,
  comment = "This is a great platform!",
  avatar,
  className = "",
}) => {
  return (
    <div
      className={`bg-white border border-border rounded-xl p-6 ${className}`}
    >
      <Quote className="w-5 h-5 text-primary mb-3" />
      <p className="text-sm text-muted italic mb-4">"{comment}"</p>
      <div className="flex items-center gap-3">
        <Avatar src={avatar} name={name} size="sm" />
        <div>
          <p className="font-medium text-text">{name}</p>
          <Rating rating={rating} readOnly size="sm" />
          <p className="text-xs text-muted">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
