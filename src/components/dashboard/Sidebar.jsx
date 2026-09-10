import { LayoutDashboard, Package, ShoppingCart, BarChart3, Users, Map, Settings, LogOut, HelpCircle, Plus, Heart, ShoppingBasket } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROLES, ROUTES } from "../../constants";
import useAuth from "../../hooks/useAuth";

const farmerNavItems = [
  { label: "Dashboard", to: ROUTES.FARMER_DASHBOARD, icon: LayoutDashboard },
  { label: "Products", to: ROUTES.FARMER_PRODUCTS, icon: Package },
  { label: "Add Product", to: ROUTES.FARMER_ADD_PRODUCT, icon: Plus },
  { label: "Orders", to: ROUTES.FARMER_ORDERS, icon: ShoppingCart },
  { label: "Messages", to: ROUTES.FARMER_MESSAGES, icon: Map },
  { label: "Earnings", to: ROUTES.FARMER_EARNINGS, icon: BarChart3 },
  { label: "Reviews", to: ROUTES.FARMER_REPUTATION, icon: Users },
  { label: "Profile", to: ROUTES.FARMER_PROFILE, icon: Settings },
  { label: "Settings", to: ROUTES.FARMER_SETTINGS, icon: HelpCircle },
];

const buyerNavItems = [
  { label: "Dashboard", to: ROUTES.BUYER_DASHBOARD, icon: LayoutDashboard },
  { label: "Marketplace", to: ROUTES.BUYER_MARKETPLACE, icon: ShoppingBasket },
  { label: "Cart", to: ROUTES.BUYER_CART, icon: ShoppingCart },
  { label: "My Orders", to: ROUTES.BUYER_ORDERS, icon: Package },
  { label: "Favorites", to: ROUTES.BUYER_FAVORITES, icon: Heart },
  { label: "Messages", to: ROUTES.BUYER_MESSAGES, icon: Map },
  { label: "Reviews", to: ROUTES.BUYER_REPUTATION, icon: Users },
  { label: "Profile", to: ROUTES.BUYER_PROFILE, icon: Settings },
  { label: "Settings", to: ROUTES.BUYER_SETTINGS, icon: HelpCircle },
];

const Sidebar = ({ role: forcedRole, navItems: customNavItems, onLinkClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const effectiveRole = forcedRole || user?.role || ROLES.FARMER;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const navItems = customNavItems || (
    effectiveRole === ROLES.BUYER ? buyerNavItems : farmerNavItems
  );

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-border overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold text-primary">AgriTrust</h2>
        <p className="text-sm text-muted capitalize">{effectiveRole.toLowerCase()} Portal</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted hover:text-text hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-gray-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
