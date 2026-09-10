import AdminStatCard from "../../components/admin/StatCard";
import { Users, Package, DollarSign, AlertTriangle } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <AdminStatCard title="Total Users" value="1,234" icon={Users} />
        <AdminStatCard title="Active Listings" value="856" icon={Package} />
        <AdminStatCard title="Transactions" value="$45,678" icon={DollarSign} />
        <AdminStatCard title="Disputes" value="3" icon={AlertTriangle} />
      </div>
      <p className="text-muted">
        Welcome to the AgriTrust admin panel.
      </p>
    </div>
  );
};

export default AdminDashboard;
