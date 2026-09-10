import { Bell, Search, Menu } from "lucide-react";
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import useAuth from "../../hooks/useAuth";
import Avatar from "../common/Avatar";
import NotificationDropdown from "./NotificationDropdown";

const DashboardHeader = () => {
  const { toggleSidebar } = useContext(AppContext);
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: "New order received", message: "Jane Buyer placed an order for Organic Tomatoes", time: "2 min ago", read: false },
    { id: 2, title: "Payment received", message: "Order ORD-001 has been paid successfully", time: "1 hour ago", read: false },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-muted" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <NotificationDropdown
            notifications={notifications}
            isOpen={notificationsOpen}
            onMarkAllRead={() => setNotificationsOpen(false)}
            onNotificationClick={() => setNotificationsOpen(false)}
          />
        </div>

        <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <Avatar name={user?.name || "User"} size="md" />
          )}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
