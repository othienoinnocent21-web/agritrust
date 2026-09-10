import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROUTES } from "../constants";

const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
