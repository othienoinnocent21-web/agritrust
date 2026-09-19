import { TrendingUp } from "lucide-react";

const AdminStatCard = ({
  title = "Stat",
  value = "0",
  icon: Icon = TrendingUp,
  change,
  trendDirection = "up",
  subtitle,
  className = "",
  onClick,
}) => {
  const trendColor =
    trendDirection === "up"
      ? "text-green-600"
      : trendDirection === "down"
      ? "text-red-600"
      : "text-muted";

  return (
    <div
      className={`bg-white border border-border rounded-xl p-4 cursor-${onClick ? "pointer" : "default"} transition-shadow hover:shadow-md ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted">{title}</p>
        {Icon && <Icon className={`w-5 h-5 ${trendColor}`} />}
      </div>
      <p className="text-2xl font-bold text-text">{value}</p>
      {change && (
        <p className={`text-xs ${trendColor} mt-1`}>
          {trendDirection === "up" ? "+" : trendDirection === "down" ? "-" : ""}
          {change}
        </p>
      )}
      {subtitle && <p className="text-xs text-muted mt-1">{subtitle}</p>}
    </div>
  );
};

export default AdminStatCard;
