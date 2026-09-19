import { useState } from "react";
import { AlertTriangle, Landmark, CheckCircle, ShieldAlert, Search, FilePlus, Filter } from "lucide-react";
import Select from "../../components/common/Select";

const formatUGX = (amount) => {
  if (amount == null || isNaN(Number(amount))) return "UGX —";
  const abs = Math.abs(Number(amount));
  return abs >= 1e6 ? `UGX ${(abs / 1e6).toFixed(1)}M` : `UGX ${abs.toLocaleString("en-UG")}`;
};

const statusTabs = [
  { label: "All Disputes", value: "all" },
  { label: "Open / Pending", value: "open" },
  { label: "Under Mediation", value: "mediation" },
  { label: "Resolved", value: "resolved" },
  { label: "Escalated to Field Agent", value: "escalated" },
];

const categoryOptions = [
  { value: "All", label: "All Categories" },
  { value: "quality", label: "Crop Quality / Moisture Mismatch" },
  { value: "weight", label: "Weight Shortage" },
  { value: "delivery", label: "Late / Non-Delivery" },
  { value: "payment", label: "Payment / Refund Request" },
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

const Disputes = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const clearFilters = () => {
    setActiveTab("all");
    setCategory("All");
    setSearch("");
  };

  const hasActiveFilters = activeTab !== "all" || category !== "All" || search;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-2">Disputes</h1>
      <p className="text-muted mb-6">
        Manage buyer-farmer quality, delivery, and payment disputes with admin arbitration.
      </p>

      {/* Disputes KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Open Disputes"
          value="5 Active Cases"
          subtext="Awaiting admin arbitration"
          icon={AlertTriangle}
          accent="emerald"
        />
        <KpiCard
          title="Frozen Funds Value"
          value={formatUGX(16500000)}
          subtext="Locked in Escrow pending resolution"
          icon={Landmark}
          accent="amber"
        />
        <KpiCard
          title="Resolved This Month"
          value="24 Cases"
          subtext="92% resolved within 48 hours"
          icon={CheckCircle}
          accent="green"
        />
        <KpiCard
          title="High Severity / Escalated"
          value="2 Cases"
          subtext="Requires quality inspector check"
          icon={ShieldAlert}
          accent="red"
        />
      </div>

      {/* Dispute Controls & Filters */}
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
              placeholder="Search by Case ID, Order ID, Buyer, or Farmer..."
              className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
            />
          </div>

          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categoryOptions}
            placeholder="Dispute Category"
            className="min-w-[280px]"
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
            className="px-4 py-2.5 text-sm font-medium text-emerald-700 border border-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <FilePlus className="w-4 h-4" />
            File Admin Escalation
          </button>
        </div>
      </div>

      {/* Results placeholder */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <Filter className="w-10 h-10 text-muted mx-auto mb-2" />
        <p className="text-muted">
          {hasActiveFilters
            ? "No disputes match the current filters."
            : "Disputes will appear here once buyers or farmers file a case."}
        </p>
      </div>
    </div>
  );
};

export default Disputes;