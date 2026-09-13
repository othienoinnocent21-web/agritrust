import { DivideIcon } from "lucide-react";

const FeatureCard = ({
  title = "Feature",
  description = "Description of the feature.",
  icon: Icon = DivideIcon,
  className = "",
}) => {
  return (
    <div
      className={`group rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 transition-colors group-hover:bg-emerald-100">
        {Icon && <Icon className="h-6 w-6 text-emerald-700 transition-transform duration-300 group-hover:scale-110" />}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
};

export default FeatureCard;
