import { lazy } from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../constants";

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const VerifyAccount = lazy(() => import("../pages/auth/VerifyAccount"));

export const authRoutes = [
  <Route key="login" path={ROUTES.LOGIN} element={<Login />} />,
  <Route key="register" path={ROUTES.REGISTER} element={<Register />} />,
  <Route key="forgot-password" path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />,
  <Route key="reset-password" path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />,
  <Route key="verify-account" path={ROUTES.VERIFY_ACCOUNT} element={<VerifyAccount />} />,
];
