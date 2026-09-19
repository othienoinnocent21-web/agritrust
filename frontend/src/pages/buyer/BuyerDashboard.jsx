import { ShoppingCart, Package, Heart, TrendingUp, ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DashboardCard from "../../components/dashboard/DashboardCard";
import QuickAction from "../../components/dashboard/QuickAction";
import SectionHeader from "../../components/dashboard/SectionHeader";
import ProductCard from "../../components/dashboard/ProductCard";
import RecentOrders from "../../components/dashboard/RecentOrders";
import EmptyState from "../../components/common/EmptyState";
import { ROUTES } from "../../constants";
import { buyerMetrics } from "../../data/mock/buyerMetrics";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const BuyerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.name || "there";
  const { stats, recommendedProducts, recentOrders, favorites } = buyerMetrics;

  return (
    <div className="p-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">
          {getGreeting()}, {displayName.split(" ")[0] || "there"}
        </h1>
        <p className="text-muted mt-1">
          Discover fresh produce from trusted farmers and track your orders.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          subtitle={`${stats.completedOrders} completed`}
          trend={stats.ordersChange}
          trendDirection="up"
        />
        <DashboardCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Package}
          subtitle="In progress"
          trend={stats.pendingChange}
          trendDirection="up"
        />
        <DashboardCard
          title="Completed Orders"
          value={stats.completedOrders}
          icon={TrendingUp}
          subtitle="Successfully delivered"
        />
        <DashboardCard
          title="Favorite Products"
          value={stats.totalFavorites}
          icon={Heart}
          subtitle={`${favorites.length} saved items`}
          trend={stats.favoritesChange}
          trendDirection="up"
        />
      </div>

      <div className="mb-8">
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <QuickAction
            label="Browse Marketplace"
            icon={ShoppingBasket}
            to={ROUTES.BUYER_MARKETPLACE}
          />
          <QuickAction
            label="View My Orders"
            icon={ShoppingCart}
            to={ROUTES.BUYER_ORDERS}
          />
          <QuickAction
            label="My Favorites"
            icon={Heart}
            to={ROUTES.BUYER_FAVORITES}
          />
        </div>
      </div>

      <div className="mb-8">
        <SectionHeader
          title="Recommended For You"
          actionLabel="View marketplace"
          actionTo={ROUTES.BUYER_MARKETPLACE}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showFarmer={true}
              actionTo={ROUTES.BUYER_PRODUCT_DETAILS.replace(":id", String(product.id))}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <SectionHeader
          title="Recent Orders"
          actionLabel="View all"
          actionTo={ROUTES.BUYER_ORDERS}
        />
        <RecentOrders orders={recentOrders} buyerColumn={true} showViewAll={false} />
      </div>

      <div>
        <SectionHeader
          title="Your Favorites"
          actionLabel="View all"
          actionTo={ROUTES.BUYER_FAVORITES}
        />
        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <EmptyState
              title="Your favorites will appear here"
              description="Save products you like to easily find them later."
              actionLabel="Explore Marketplace"
              onAction={() => navigate(ROUTES.BUYER_MARKETPLACE)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showFarmer={true}
                actionTo={ROUTES.BUYER_PRODUCT_DETAILS.replace(":id", String(product.id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
