import { useState } from "react";
import { TrendingUp, Wallet, Sprout, FileText, Search, Download, Calendar, Filter } from "lucide-react";
import Select from "../../components/common/Select";

const formatUGX = (amount) => {
  if (amount == null || isNaN(Number(amount))) return "UGX —";
  const abs = Math.abs(Number(amount));
  if (abs >= 1e9) return `UGX ${(abs / 1e9).toFixed(2)}B`;
  return abs >= 1e6 ? `UGX ${(abs / 1e6).toFixed(1)}M` : `UGX ${abs.toLocaleString("en-UG")}`;
};

const datePresets = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Year to Date", value: "ytd" },
  { label: "Custom Range", value: "custom" },
];

const regionOptions = [
  { value: "All", label: "All Regions" },
  { value: "Central", label: "Central" },
  { value: "Western", label: "Western" },
  { value: "Eastern", label: "Eastern" },
  { value: "Northern", label: "Northern" },
];

const commodityOptions = [
  { value: "All", label: "All Crops" },
  { value: "maize", label: "Maize" },
  { value: "coffee", label: "Robusta / Arabica Coffee" },
  { value: "dairy", label: "Dairy" },
  { value: "beans", label: "Beans" },
  { value: "matooke", label: "Matooke" },
];

const KpiCard = ({ title, value, subtext, icon: Icon, accent }) => {
  const accentColors = {
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
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

const Reports = () => {
  const [datePreset, setDatePreset] = useState("ytd");
  const [region, setRegion] = useState("All");
  const [commodity, setCommodity] = useState("All");
  const [search, setSearch] = useState("");

  const clearFilters = () => {
    setDatePreset("ytd");
    setRegion("All");
    setCommodity("All");
    setSearch("");
  };

  const hasActiveFilters = datePreset !== "ytd" || region !== "All" || commodity !== "All" || search;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-2">Reports</h1>
      <p className="text-muted mb-6">
        View platform analytics, trade volume, revenue, and export audited reports.
      </p>

      {/* Reports Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Gross Platform GMV"
          value={formatUGX(1280000000)}
          subtext="Total traded volume YTD"
          icon={TrendingUp}
          accent="emerald"
        />
        <KpiCard
          title="Platform Revenue & Fees"
          value={formatUGX(38400000)}
          subtext="3% transaction commission earned"
          icon={Wallet}
          accent="blue"
        />
        <KpiCard
          title="Top Traded Produce Volume"
          value="1,420 Metric Tons"
          subtext="Maize & Coffee lead regional trade"
          icon={Sprout}
          accent="amber"
        />
        <KpiCard
          title="Generated Reports Count"
          value="142 PDF/CSV Exports"
          subtext="Audited monthly reports"
          icon={FileText}
          accent="purple"
        />
      </div>

      {/* Report Controls & Global Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        {/* Controls Row */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by report name, region, or commodity..."
              className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
            />
          </div>

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

          <Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            options={regionOptions}
            placeholder="Region"
            className="min-w-[160px]"
            selectClassName="py-2.5 text-sm"
          />

          <Select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            options={commodityOptions}
            placeholder="Commodity"
            className="min-w-[200px]"
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
            <Download className="w-4 h-4" />
            Generate Custom Audit Report
          </button>
        </div>
      </div>

      {/* Results placeholder */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <Filter className="w-10 h-10 text-muted mx-auto mb-2" />
        <p className="text-muted">
          {hasActiveFilters
            ? "No reports match the current filters."
            : "Reports will appear here once generated or exported."}
        </p>
      </div>
    </div>
  );
};

export default Reports;