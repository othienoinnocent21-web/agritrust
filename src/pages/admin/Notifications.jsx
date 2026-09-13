import { useState } from "react";
import { mockNotifications } from "../../data/mock/notifications";
import { CheckCheck, Bell, Search, Settings } from "lucide-react";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

const categoryTabs = [
  { label: "All Notifications", value: "all", badge: "3 New" },
  { label: "Verifications", value: "verifications" },
  { label: "Escrow & Payouts", value: "escrow" },
  { label: "Disputes", value: "disputes" },
  { label: "System & Security", value: "system" },
];

const typeConfig = {
  order: { label: "Order", variant: "info" },
  payment: { label: "Payment", variant: "success" },
  review: { label: "Review", variant: "warning" },
  verification: { label: "Verification", variant: "primary" },
  escrow: { label: "Escrow", variant: "secondary" },
  dispute: { label: "Dispute", variant: "danger" },
  system: { label: "System", variant: "default" },
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-UG", { month: "short", day: "numeric", year: "numeric" });
};

const Notifications = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filtered = notifications.filter((n) => {
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "verifications" && n.type === "verification") ||
      (activeCategory === "escrow" && (n.type === "payment" || n.type === "escrow")) ||
      (activeCategory === "disputes" && n.type === "dispute") ||
      (activeCategory === "system" && n.type === "system");
    const matchesSearch =
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-2">Admin Notifications</h1>
      <p className="text-muted mb-6">
        Stay updated on verifications, escrow payouts, disputes, and system alerts.
      </p>

      {/* Category Filter Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeCategory === tab.value
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-muted hover:text-text hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {tab.badge && tab.value === "all" && (
                <Badge variant="danger" size="sm">
                  {tab.badge}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Quick Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications by user, order ID, or keyword..."
              className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
            />
          </div>

          <Button
            variant="outline"
            leftIcon={CheckCheck}
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
          >
            Mark All as Read
          </Button>

          <Button
            variant="ghost"
            leftIcon={Settings}
            as="Link"
            to="/admin/settings"
          >
            Notification Settings
          </Button>
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {filtered.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-10 h-10 text-muted mx-auto mb-2" />
            <p className="text-muted">
              {search || activeCategory !== "all"
                ? "No notifications match the current filters."
                : "No notifications yet."}
            </p>
          </div>
        ) : (
          filtered.map((n) => {
            const cfg = typeConfig[n.type] || typeConfig.system;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !n.isRead ? "bg-emerald-50/40" : ""
                }`}
                onClick={() => handleMarkRead(n.id)}
              >
                <div className="mt-1">
                  {n.isRead ? (
                    <div className="w-2 h-2 rounded-full bg-transparent" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm ${!n.isRead ? "font-semibold text-text" : "font-medium text-muted"}`}>
                      {n.title}
                    </p>
                    <Badge variant={cfg.variant} size="sm">
                      {cfg.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted mt-0.5">{n.message}</p>
                  <p className="text-xs text-muted mt-1">{formatDate(n.createdAt)}</p>
                </div>
                {!n.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkRead(n.id);
                    }}
                    className="text-xs text-emerald-700 hover:underline whitespace-nowrap"
                  >
                    Mark read
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;