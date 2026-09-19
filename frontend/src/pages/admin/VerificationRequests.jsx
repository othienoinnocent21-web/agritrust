import { useState } from "react";
import { CheckCircle, Shield, AlertTriangle, Search, Filter } from "lucide-react";
import Select from "../../components/common/Select";

const statusTabs = [
  { label: "All Requests", value: "all" },
  { label: "Pending Approval", value: "pending" },
  { label: "Under Review", value: "review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const entityOptions = [
  { value: "All", label: "All Entity Types" },
  { value: "individual", label: "Individual Smallholder" },
  { value: "cooperative", label: "Agricultural Cooperative / Group" },
  { value: "commercial", label: "Commercial Supplier" },
];

const regionOptions = [
  { value: "All", label: "All Regions" },
  { value: "Central", label: "Central" },
  { value: "Western", label: "Western" },
  { value: "Eastern", label: "Eastern" },
  { value: "Northern", label: "Northern" },
];

const MetricCard = ({ title, value, subtext, icon: Icon, accent }) => {
  const accentColors = {
    emerald: "bg-emerald-50 text-emerald-700",
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-text mt-1">{value}</p>
          <p className="text-xs text-muted mt-1">{subtext}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${accentColors[accent] || accentColors.emerald}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};

const VerificationRequests = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [entity, setEntity] = useState("All");
  const [region, setRegion] = useState("All");

  const clearFilters = () => {
    setActiveTab("all");
    setSearch("");
    setEntity("All");
    setRegion("All");
  };

  const hasActiveFilters = activeTab !== "all" || search || entity !== "All" || region !== "All";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-2">Verification Requests</h1>
      <p className="text-muted mb-6">
        Review and manage farmer, cooperative, and supplier verification applications.
      </p>

      {/* KPI Metric Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Pending"
          value="18 Requests"
          subtext="Requires admin review"
          icon={AlertTriangle}
          accent="emerald"
        />
        <MetricCard
          title="National ID / NIN Verified"
          value="142 Farmers"
          subtext="NIN-backed identity confirmed"
          icon={CheckCircle}
          accent="green"
        />
        <MetricCard
          title="UNBS Certified Quality"
          value="38 Quality Badges"
          subtext="Uganda National Bureau of Standards"
          icon={Shield}
          accent="blue"
        />
        <MetricCard
          title="Rejected / Flagged"
          value="5 Requests"
          subtext="Needs follow-up or removal"
          icon={AlertTriangle}
          accent="red"
        />
      </div>

      {/* Filter & Tab System */}
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

        {/* Dropdowns & Search */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Farmer Name, NIN, Phone, or District..."
              className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
            />
          </div>
          <Select
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
            options={entityOptions}
            placeholder="Entity Type"
            className="min-w-[260px]"
            selectClassName="py-2.5 text-sm"
          />
          <Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            options={regionOptions}
            placeholder="Region"
            className="min-w-[180px]"
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
        </div>
      </div>

      {/* Results placeholder */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <Filter className="w-10 h-10 text-muted mx-auto mb-2" />
        <p className="text-muted">
          {hasActiveFilters
            ? "No verification requests match the current filters."
            : "Verification requests will appear here once submitted."}
        </p>
      </div>
    </div>
  );
};

export default VerificationRequests;