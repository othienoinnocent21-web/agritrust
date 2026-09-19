import { lazy } from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../constants";

const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const Users = lazy(() => import("../pages/admin/Users"));
const UserDetails = lazy(() => import("../pages/admin/UserDetails"));
const VerificationRequests = lazy(() => import("../pages/admin/VerificationRequests"));
const Transactions = lazy(() => import("../pages/admin/Transactions"));
const AdminEscrow = lazy(() => import("../pages/admin/Escrow"));
const Disputes = lazy(() => import("../pages/admin/Disputes"));
const Reports = lazy(() => import("../pages/admin/Reports"));
const AdminNotifications = lazy(() => import("../pages/admin/Notifications"));
const AdminSettings = lazy(() => import("../pages/admin/Settings"));

export const adminRoutes = [
  <Route key="admin-dashboard" path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />,
  <Route key="admin-users" path={ROUTES.ADMIN_USERS} element={<Users />} />,
  <Route key="admin-user-details" path={ROUTES.ADMIN_USER_DETAILS} element={<UserDetails />} />,
  <Route key="admin-verification-requests" path={ROUTES.ADMIN_VERIFICATION_REQUESTS} element={<VerificationRequests />} />,
  <Route key="admin-transactions" path={ROUTES.ADMIN_TRANSACTIONS} element={<Transactions />} />,
  <Route key="admin-escrow" path={ROUTES.ADMIN_ESCROW} element={<AdminEscrow />} />,
  <Route key="admin-disputes" path={ROUTES.ADMIN_DISPUTES} element={<Disputes />} />,
  <Route key="admin-reports" path={ROUTES.ADMIN_REPORTS} element={<Reports />} />,
  <Route key="admin-notifications" path={ROUTES.ADMIN_NOTIFICATIONS} element={<AdminNotifications />} />,
  <Route key="admin-settings" path={ROUTES.ADMIN_SETTINGS} element={<AdminSettings />} />,
];
