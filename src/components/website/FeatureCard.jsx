import { DivideIcon } from "lucide-react";

const FeatureCard = ({
  title = "Feature",
  description = "Description of the feature.",
  icon: Icon = DivideIcon,
  className = "",
}) => {
  return (
    <div
      className={`bg-white border border-border rounded-xl p-6 text-center transition-transform hover:shadow-md ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        {Icon && <Icon className="w-6 h-6 text-primary" />}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
};

export default FeatureCard;
