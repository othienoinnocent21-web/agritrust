import { Package, ShoppingCart, DollarSign, TrendingUp, Plus } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import DashboardCard from "../../components/dashboard/DashboardCard";
import QuickAction from "../../components/dashboard/QuickAction";
import SectionHeader from "../../components/dashboard/SectionHeader";
import ProductCard from "../../components/dashboard/ProductCard";
import RecentOrders from "../../components/dashboard/RecentOrders";
import { ROUTES } from "../../constants";
import { farmerMetrics } from "../../data/mock/farmerMetrics";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const FarmerDashboard = () => {
  const { user } = useAuth();
  const displayName = user?.name || "there";
  const { stats, recentOrders, productPerformance } = farmerMetrics;

  return (
    <div className="p-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">
          {getGreeting()}, {displayName.split(" ")[0] || "there"}
        </h1>
        <p className="text-muted mt-1">
          Here is what is happening with your farm and marketplace listings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          subtitle={`${stats.activeListings} active`}
          trend={stats.productsChange}
          trendDirection="up"
        />
        <DashboardCard
          title="Active Listings"
          value={stats.activeListings}
          icon={TrendingUp}
          subtitle={`${stats.totalProducts - stats.activeListings} out of stock`}
        />
        <DashboardCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={ShoppingCart}
          subtitle="Awaiting your fulfillment"
          trend={stats.ordersChange}
          trendDirection="up"
        />
        <DashboardCard
          title="Total Earnings"
          value={`$${stats.totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          subtitle="Lifetime revenue"
          trend={stats.earningsChange}
          trendDirection="up"
        />
      </div>

      <div className="mb-8">
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <QuickAction
            label="Add Product"
            icon={Plus}
            to={ROUTES.FARMER_ADD_PRODUCT}
          />
          <QuickAction
            label="Manage Products"
            icon={Package}
            to={ROUTES.FARMER_PRODUCTS}
          />
          <QuickAction
            label="View Orders"
            icon={ShoppingCart}
            to={ROUTES.FARMER_ORDERS}
          />
        </div>
      </div>

      <div className="mb-8">
        <SectionHeader
          title="Recent Orders"
          actionLabel="View all"
          actionTo={ROUTES.FARMER_ORDERS}
        />
        <RecentOrders orders={recentOrders} buyerColumn={false} showViewAll={false} />
      </div>

      <div>
        <SectionHeader
          title="Product Performance"
          actionLabel="View all"
          actionTo={ROUTES.FARMER_PRODUCTS}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productPerformance.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showFarmer={false}
              actionTo={ROUTES.FARMER_PRODUCTS}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
