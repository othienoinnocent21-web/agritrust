import { useState } from "react";
import { TrendingUp, Smartphone, Landmark, Coins, Search, Download, Calendar, Filter } from "lucide-react";
import Select from "../../components/common/Select";

const formatUGX = (amount) => {
  if (amount == null || isNaN(Number(amount))) return "UGX —";
  const abs = Math.abs(Number(amount));
  return abs >= 1e6 ? `UGX ${(abs / 1e6).toFixed(1)}M` : `UGX ${abs.toLocaleString("en-UG")}`;
};

const statusTabs = [
  { label: "All Transactions", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending Escrow", value: "pending" },
  { label: "In Transit / Delivery", value: "transit" },
  { label: "Refunded / Flagged", value: "refunded" },
];

const gatewayOptions = [
  { value: "All", label: "All Gateways" },
  { value: "mtn", label: "MTN Mobile Money" },
  { value: "airtel", label: "Airtel Money" },
  { value: "stanbic", label: "Stanbic Bank Escrow" },
  { value: "centenary", label: "Centenary Bank Wire" },
];

const datePresets = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Custom Date Range", value: "custom" },
];

const KpiCard = ({ title, value, subtext, icon: Icon, trend }) => {
  const isPositive = trend && trend.startsWith("+");
  const trendColor = isPositive ? "text-emerald-600" : "text-rose-600";
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-text mt-1">{value}</p>
          {trend && (
            <p className={`text-xs font-medium mt-1 ${trendColor}`}>
              {trend}
            </p>
          )}
          {subtext && <p className="text-xs text-muted mt-1">{subtext}</p>}
        </div>
        <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl ml-3">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [gateway, setGateway] = useState("All");
  const [datePreset, setDatePreset] = useState("month");
  const [search, setSearch] = useState("");

  const clearFilters = () => {
    setActiveTab("all");
    setGateway("All");
    setDatePreset("month");
    setSearch("");
  };

  const hasActiveFilters = activeTab !== "all" || gateway !== "All" || datePreset !== "month" || search;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-2">Transactions</h1>
      <p className="text-muted mb-6">
        Monitor all financial transactions, escrow holds, and payout releases across every gateway.
      </p>

      {/* Financial KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Total Volume Transacted"
          value={formatUGX(248500000)}
          subtext="Processed across all payment gateways"
          icon={TrendingUp}
          trend="+15.2% this month"
        />
        <KpiCard
          title="Mobile Money Volume"
          value={formatUGX(162000000)}
          subtext="MTN MoMo & Airtel Money"
          icon={Smartphone}
          trend="+18.4% this month"
        />
        <KpiCard
          title="Direct Bank Wire & Escrow"
          value={formatUGX(86500000)}
          subtext="Commercial Bank transfers"
          icon={Landmark}
          trend="+9.1% this month"
        />
        <KpiCard
          title="Platform Commission Earned"
          value={formatUGX(7400000)}
          subtext="3% platform fee applied"
          icon={Coins}
          trend="+12.7% this month"
        />
      </div>

      {/* Filter & Control Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1 p-1 bg-gray-50 rounded-xl mb-4">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-muted hover:text-text hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Controls Row */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Transaction Reference (e.g. TXN-89420), Buyer, Farmer, or Mobile Number..."
              className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
            />
          </div>

          <Select
            value={gateway}
            onChange={(e) => setGateway(e.target.value)}
            options={gatewayOptions}
            placeholder="Payment Method"
            className="min-w-[220px]"
            selectClassName="py-2.5 text-sm"
          />

          <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-lg">
            {datePresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setDatePreset(preset.value)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  datePreset === preset.value
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-muted hover:text-text hover:bg-white"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                {preset.label}
              </button>
            ))}
          </div>

          <button
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="px-3 py-2.5 text-sm text-muted hover:text-text border border-border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Clear All
          </button>

          <button
            onClick={() => {}}
            className="px-4 py-2.5 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export CSV / Excel
          </button>
        </div>
      </div>

      {/* Results placeholder */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <Filter className="w-10 h-10 text-muted mx-auto mb-2" />
        <p className="text-muted">
          {hasActiveFilters
            ? "No transactions match the current filters."
            : "Transactions will appear here once payments are processed."}
        </p>
      </div>
    </div>
  );
};

export default Transactions;