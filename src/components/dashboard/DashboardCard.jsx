import Card from "../common/Card";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection,
  subtitle,
  className = "",
  onClick,
}) => {
  return (
    <Card
      className={`cursor-${onClick ? "pointer" : "default"} transition-transform hover:shadow-md ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {title && <p className="text-sm text-muted mb-1">{title}</p>}
          {value && <p className="text-2xl font-bold text-text">{value}</p>}
          {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs ${trendDirection === "up" ? "text-green-600" : "text-red-600"}`}>
              {trendDirection === "up" ? "+" : "-"}{trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default DashboardCard;
