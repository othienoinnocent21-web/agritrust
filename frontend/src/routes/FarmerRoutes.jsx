import { lazy } from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../constants";

const FarmerDashboard = lazy(() => import("../pages/farmer/FarmerDashboard"));
const Products = lazy(() => import("../pages/farmer/Products"));
const AddProduct = lazy(() => import("../pages/farmer/AddProduct"));
const EditProduct = lazy(() => import("../pages/farmer/EditProduct"));
const ProductDetails = lazy(() => import("../pages/farmer/ProductDetails"));
const FarmerOrders = lazy(() => import("../pages/farmer/Orders"));
const FarmerOrderDetails = lazy(() => import("../pages/farmer/OrderDetails"));
const Earnings = lazy(() => import("../pages/farmer/Earnings"));
const Reputation = lazy(() => import("../pages/farmer/Reputation"));
const Verification = lazy(() => import("../pages/farmer/Verification"));
const Escrow = lazy(() => import("../pages/farmer/Escrow"));
const Messages = lazy(() => import("../pages/farmer/Messages"));
const Notifications = lazy(() => import("../pages/farmer/Notifications"));
const FarmerProfile = lazy(() => import("../pages/farmer/Profile"));
const FarmerSettings = lazy(() => import("../pages/farmer/Settings"));

export const farmerRoutes = [
  <Route key="farmer-dashboard" path={ROUTES.FARMER_DASHBOARD} element={<FarmerDashboard />} />,
  <Route key="farmer-products" path={ROUTES.FARMER_PRODUCTS} element={<Products />} />,
  <Route key="farmer-add-product" path={ROUTES.FARMER_ADD_PRODUCT} element={<AddProduct />} />,
  <Route key="farmer-edit-product" path={ROUTES.FARMER_EDIT_PRODUCT} element={<EditProduct />} />,
  <Route key="farmer-product-details" path={ROUTES.FARMER_PRODUCT_DETAILS} element={<ProductDetails />} />,
  <Route key="farmer-orders" path={ROUTES.FARMER_ORDERS} element={<FarmerOrders />} />,
  <Route key="farmer-order-details" path={ROUTES.FARMER_ORDER_DETAILS} element={<FarmerOrderDetails />} />,
  <Route key="farmer-earnings" path={ROUTES.FARMER_EARNINGS} element={<Earnings />} />,
  <Route key="farmer-reputation" path={ROUTES.FARMER_REPUTATION} element={<Reputation />} />,
  <Route key="farmer-verification" path={ROUTES.FARMER_VERIFICATION} element={<Verification />} />,
  <Route key="farmer-escrow" path={ROUTES.FARMER_ESCROW} element={<Escrow />} />,
  <Route key="farmer-messages" path={ROUTES.FARMER_MESSAGES} element={<Messages />} />,
  <Route key="farmer-notifications" path={ROUTES.FARMER_NOTIFICATIONS} element={<Notifications />} />,
  <Route key="farmer-profile" path={ROUTES.FARMER_PROFILE} element={<FarmerProfile />} />,
  <Route key="farmer-settings" path={ROUTES.FARMER_SETTINGS} element={<FarmerSettings />} />,
];
