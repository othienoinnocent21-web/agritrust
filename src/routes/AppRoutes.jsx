import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import ErrorBoundary from "./ErrorBoundary";
import NotFound from "../pages/NotFound";
import { publicRoutes } from "./PublicRoutes";
import { authRoutes } from "./AuthRoutes";
import { farmerRoutes } from "./FarmerRoutes";
import { buyerRoutes } from "./BuyerRoutes";
import { adminRoutes } from "./AdminRoutes";
import { ROLES, ROUTES } from "../constants";

const CommonComponents = lazy(() => import("../pages/dev/CommonComponents"));
const Layouts = lazy(() => import("../pages/dev/Layouts"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="Loading..." />}>
      <Routes>
        <Route errorElement={<ErrorBoundary />}>
          <Route element={<PublicLayout />}>
            {publicRoutes}
          </Route>

          <Route element={<AuthLayout />}>
            {authRoutes}
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route element={<RoleRoute allowedRoles={[ROLES.FARMER]} />}>
                {farmerRoutes}
              </Route>

              <Route element={<RoleRoute allowedRoles={[ROLES.BUYER]} />}>
                {buyerRoutes}
              </Route>
            </Route>

            <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route element={<AdminLayout />}>
                {adminRoutes}
              </Route>
            </Route>
          </Route>

          <Route path={ROUTES.DEV_COMMON} element={<CommonComponents />} />
          <Route path={ROUTES.DEV_LAYOUTS} element={<Layouts />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
