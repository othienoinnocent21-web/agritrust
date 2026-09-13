import { useState } from "react";
import { Landmark, Clock, CheckCircle, AlertTriangle, Search, ShieldCheck, Wallet } from "lucide-react";
import Select from "../../components/common/Select";

const formatUGX = (amount) => {
  if (amount == null || isNaN(Number(amount))) return "UGX —";
  const abs = Math.abs(Number(amount));
  return abs >= 1e6 ? `UGX ${(abs / 1e6).toFixed(1)}M` : `UGX ${abs.toLocaleString("en-UG")}`;
};

const statusTabs = [
  { label: "All Escrow Accounts", value: "all" },
  { label: "Funds Locked", value: "locked" },
  { label: "Awaiting Buyer Sign-Off", value: "signoff" },
  { label: "Ready for Payout", value: "payout" },
  { label: "Disputed / Frozen", value: "disputed" },
];

const providerOptions = [
  { value: "All", label: "All Providers" },
  { value: "mtn", label: "MTN Mobile Money" },
  { value: "airtel", label: "Airtel Money" },
  { value: "centenary", label: "Centenary Bank" },
  { value: "stanbic", label: "Stanbic Bank" },
];

const KpiCard = ({ title, value, subtext, icon: Icon, accent }) => {
  const accentColors = {
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-text mt-1">{value}</p>
          {subtext && <p className="text-xs text-muted mt-1">{subtext}</p>}
        </div>
        <div className={`p-2.5 rounded-xl ml-3 ${accentColors[accent] || accentColors.emerald}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};

const Escrow = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [provider, setProvider] = useState("All");
  const [search, setSearch] = useState("");

  const clearFilters = () => {
    setActiveTab("all");
    setProvider("All");
    setSearch("");
  };

  const hasActiveFilters = activeTab !== "all" || provider !== "All" || search;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-2">Escrow Management</h1>
      <p className="text-muted mb-6">
        Monitor locked funds, inspection status, payout releases, and dispute freezes.
      </p>

      {/* Escrow Vault KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Total Locked Escrow Balance"
          value={formatUGX(142800000)}
          subtext="Held across 38 active trade orders"
          icon={Landmark}
          accent="emerald"
        />
        <KpiCard
          title="Pending Inspection & Release"
          value={formatUGX(56200000)}
          subtext="Goods in transit / inspection"
          icon={Clock}
          accent="amber"
        />
        <KpiCard
          title="Released Today"
          value={formatUGX(28500000)}
          subtext="Disbursed to farmers via MTN/Airtel MoMo & Bank"
          icon={CheckCircle}
          accent="green"
        />
        <KpiCard
          title="Frozen / Disputed Funds"
          value={formatUGX(4800000)}
          subtext="2 active quality/delivery disputes"
          icon={AlertTriangle}
          accent="red"
        />
      </div>

      {/* Escrow Filter & Action Bar */}
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
              placeholder="Search by Escrow Account ID, Order ID, Buyer, or Farmer..."
              className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
            />
          </div>

          <Select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            options={providerOptions}
            placeholder="Payment Provider"
            className="min-w-[220px]"
            selectClassName="py-2.5 text-sm"
          />

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2.5 text-sm text-muted hover:text-text border border-border rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Clear All
            </button>
          )}

          <button
            onClick={() => {}}
            className="px-4 py-2.5 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4" />
            Payout Batch Run
          </button>
        </div>
      </div>

      {/* Results placeholder */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <Wallet className="w-10 h-10 text-muted mx-auto mb-2" />
        <p className="text-muted">
          {hasActiveFilters
            ? "No escrow accounts match the current filters."
            : "Escrow accounts will appear here once trade orders are locked."}
        </p>
      </div>
    </div>
  );
};

export default Escrow;