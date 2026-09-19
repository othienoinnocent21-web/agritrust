import { lazy } from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../constants";

const BuyerDashboard = lazy(() => import("../pages/buyer/BuyerDashboard"));
const BuyerMarketplace = lazy(() => import("../pages/buyer/Marketplace"));
const ProductDetails = lazy(() => import("../pages/buyer/ProductDetails"));
const BuyerCart = lazy(() => import("../pages/buyer/Cart"));
const BuyerCheckout = lazy(() => import("../pages/buyer/Checkout"));
const BuyerOrders = lazy(() => import("../pages/buyer/Orders"));
const BuyerOrderDetails = lazy(() => import("../pages/buyer/OrderDetails"));
const Favorites = lazy(() => import("../pages/buyer/Favorites"));
const Farmers = lazy(() => import("../pages/buyer/Farmers"));
const BuyerReputation = lazy(() => import("../pages/buyer/Reputation"));
const BuyerEscrow = lazy(() => import("../pages/buyer/Escrow"));
const BuyerMessages = lazy(() => import("../pages/buyer/Messages"));
const BuyerNotifications = lazy(() => import("../pages/buyer/Notifications"));
const BuyerProfile = lazy(() => import("../pages/buyer/Profile"));
const BuyerSettings = lazy(() => import("../pages/buyer/Settings"));

export const buyerRoutes = [
  <Route key="buyer-dashboard" path={ROUTES.BUYER_DASHBOARD} element={<BuyerDashboard />} />,
  <Route key="buyer-marketplace" path={ROUTES.BUYER_MARKETPLACE} element={<BuyerMarketplace />} />,
  <Route key="buyer-product-details" path={ROUTES.BUYER_PRODUCT_DETAILS} element={<ProductDetails />} />,
  <Route key="buyer-cart" path={ROUTES.BUYER_CART} element={<BuyerCart />} />,
  <Route key="buyer-checkout" path={ROUTES.BUYER_CHECKOUT} element={<BuyerCheckout />} />,
  <Route key="buyer-orders" path={ROUTES.BUYER_ORDERS} element={<BuyerOrders />} />,
  <Route key="buyer-order-details" path={ROUTES.BUYER_ORDER_DETAILS} element={<BuyerOrderDetails />} />,
  <Route key="buyer-favorites" path={ROUTES.BUYER_FAVORITES} element={<Favorites />} />,
  <Route key="buyer-farmers" path={ROUTES.BUYER_FARMERS} element={<Farmers />} />,
  <Route key="buyer-reputation" path={ROUTES.BUYER_REPUTATION} element={<BuyerReputation />} />,
  <Route key="buyer-escrow" path={ROUTES.BUYER_ESCROW} element={<BuyerEscrow />} />,
  <Route key="buyer-messages" path={ROUTES.BUYER_MESSAGES} element={<BuyerMessages />} />,
  <Route key="buyer-notifications" path={ROUTES.BUYER_NOTIFICATIONS} element={<BuyerNotifications />} />,
  <Route key="buyer-profile" path={ROUTES.BUYER_PROFILE} element={<BuyerProfile />} />,
  <Route key="buyer-settings" path={ROUTES.BUYER_SETTINGS} element={<BuyerSettings />} />,
];
