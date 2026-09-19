import { X, LogOut } from "lucide-react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import { ROLES, ROUTES } from "../../constants";
import useAuth from "../../hooks/useAuth";

const farmerNavItems = [
  { label: "Dashboard", to: ROUTES.FARMER_DASHBOARD },
  { label: "Products", to: ROUTES.FARMER_PRODUCTS },
  { label: "Add Product", to: ROUTES.FARMER_ADD_PRODUCT },
  { label: "Orders", to: ROUTES.FARMER_ORDERS },
  { label: "Messages", to: ROUTES.FARMER_MESSAGES },
  { label: "Earnings", to: ROUTES.FARMER_EARNINGS },
  { label: "Reviews", to: ROUTES.FARMER_REPUTATION },
  { label: "Profile", to: ROUTES.FARMER_PROFILE },
  { label: "Settings", to: ROUTES.FARMER_SETTINGS },
];

const buyerNavItems = [
  { label: "Dashboard", to: ROUTES.BUYER_DASHBOARD },
  { label: "Marketplace", to: ROUTES.BUYER_MARKETPLACE },
  { label: "Cart", to: ROUTES.BUYER_CART },
  { label: "My Orders", to: ROUTES.BUYER_ORDERS },
  { label: "Favorites", to: ROUTES.BUYER_FAVORITES },
  { label: "Messages", to: ROUTES.BUYER_MESSAGES },
  { label: "Reviews", to: ROUTES.BUYER_REPUTATION },
  { label: "Profile", to: ROUTES.BUYER_PROFILE },
  { label: "Settings", to: ROUTES.BUYER_SETTINGS },
];

const MobileSidebar = ({ navItems: customNavItems }) => {
  const { sidebarOpen, closeSidebar } = useContext(AppContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const effectiveRole = user?.role || ROLES.FARMER;

  const handleLogout = () => {
    logout();
    closeSidebar();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  if (!sidebarOpen) return null;

  const items = customNavItems || (
    effectiveRole === ROLES.BUYER ? buyerNavItems : farmerNavItems
  );

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-end bg-black/50">
      <div className="w-64 h-full bg-white border-l border-border overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-primary">AgriTrust</h2>
          <button
            onClick={closeSidebar}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted hover:text-text hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
