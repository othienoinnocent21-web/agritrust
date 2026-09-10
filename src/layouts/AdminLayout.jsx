import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Sidebar from "../components/dashboard/Sidebar";
import MobileSidebar from "../components/dashboard/MobileSidebar";
import { ROUTES, ROLES } from "../constants";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CreditCard,
  Wallet,
  AlertTriangle,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

const adminNavItems = [
  { label: "Dashboard", to: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: "Users", to: ROUTES.ADMIN_USERS, icon: Users },
  {
    label: "Verification Requests",
    to: ROUTES.ADMIN_VERIFICATION_REQUESTS,
    icon: ShieldCheck,
  },
  { label: "Transactions", to: ROUTES.ADMIN_TRANSACTIONS, icon: CreditCard },
  { label: "Escrow", to: ROUTES.ADMIN_ESCROW, icon: Wallet },
  { label: "Disputes", to: ROUTES.ADMIN_DISPUTES, icon: AlertTriangle },
  { label: "Reports", to: ROUTES.ADMIN_REPORTS, icon: BarChart3 },
  { label: "Notifications", to: ROUTES.ADMIN_NOTIFICATIONS, icon: Bell },
  { label: "Settings", to: ROUTES.ADMIN_SETTINGS, icon: Settings },
];

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <MobileSidebar navItems={adminNavItems} />
      <Sidebar role={ROLES.ADMIN} navItems={adminNavItems} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
