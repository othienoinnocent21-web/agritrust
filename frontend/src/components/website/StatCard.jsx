import { TrendingUp } from "lucide-react";

const StatCard = ({
  title = "Stat",
  value = "0",
  change,
  icon: Icon = TrendingUp,
  trend = "up",
  className = "",
}) => {
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted";

  return (
    <div
      className={`bg-white border border-border rounded-xl p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted">{title}</p>
        {Icon && <Icon className={`w-5 h-5 ${trendColor}`} />}
      </div>
      <p className="text-2xl font-bold text-text">{value}</p>
      {change && (
        <p className={`text-sm ${trendColor}`}>
          {trend === "up" ? "+" : trend === "down" ? "-" : ""}{change}
        </p>
      )}
    </div>
  );
};

export default StatCard;
