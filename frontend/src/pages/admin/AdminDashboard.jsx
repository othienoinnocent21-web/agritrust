import { Users, Package, Landmark, ShieldCheck, TrendingUp, TrendingDown } from "lucide-react";

const formatUGX = (amount) => {
  if (amount == null || isNaN(Number(amount))) return "UGX —";
  const abs = Math.abs(Number(amount));
  const formatted = abs >= 1e6
    ? `UGX ${(abs / 1e6).toFixed(1)}M`
    : `UGX ${abs.toLocaleString("en-UG")}`;
  return formatted;
};

const TrendBadge = ({ percent, direction }) => {
  const isUp = direction === "up";
  const isDown = direction === "down";
  const color = isUp ? "text-emerald-600 bg-emerald-50" : isDown ? "text-rose-600 bg-rose-50" : "text-muted bg-gray-50";
  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : null;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {percent}
    </span>
  );
};

const KPICard = ({ title, value, subtitle, trend, trendDirection, icon: Icon }) => {
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white p-6 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-emerald-50/60 flex items-center justify-center">
        {Icon && <Icon className="w-10 h-10 text-emerald-200" />}
      </div>
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted">{title}</p>
          <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl">
            {Icon && <Icon className="w-5 h-5" />}
          </div>
        </div>
        <p className="text-3xl font-bold text-text">{value}</p>
        {trend && (
          <div className="mt-2">
            <TrendBadge percent={trend} direction={trendDirection} />
          </div>
        )}
        {subtitle && <p className="text-xs text-muted mt-2">{subtitle}</p>}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const kpis = [
    {
      title: "Total Verified Farmers & Buyers",
      value: "1,234",
      subtitle: "840 Farmers | 394 Commercial Buyers",
      icon: Users,
      trend: "+12.4%",
      trendDirection: "up",
    },
    {
      title: "Active Trade Listings",
      value: "856",
      subtitle: "Top crop: Maize & Coffee",
      icon: Package,
      trend: "+8.2%",
      trendDirection: "up",
    },
    {
      title: "Total Gross Trade Value",
      value: formatUGX(185500000),
      subtitle: "Processed this month via Mobile Money & Bank Escrow",
      icon: Landmark,
      trend: "+15.7%",
      trendDirection: "up",
    },
    {
      title: "Escrow & UNBS Verification",
      value: "17",
      subtitle: "14 Pending Mobile Money Payouts | 3 Quality Disputes",
      icon: ShieldCheck,
      trend: "-2.1%",
      trendDirection: "down",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpis.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>
      <p className="text-muted">
        Welcome to the AgriTrust admin panel.
      </p>
    </div>
  );
};

export default AdminDashboard;