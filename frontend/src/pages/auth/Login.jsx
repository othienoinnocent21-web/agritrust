
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { ROUTES, ROLES } from "../../constants";
import useAuth from "../../hooks/useAuth";

const roleDashboardMap = {
  [ROLES.FARMER]: ROUTES.FARMER_DASHBOARD,
  [ROLES.BUYER]: ROUTES.BUYER_DASHBOARD,
  [ROLES.ADMIN]: ROUTES.ADMIN_DASHBOARD,
};

const Login = () => {
  const navigate = useNavigate();

  const {
    login,
    isAuthenticated,
    user,
    loading,
  } = useAuth();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboard = roleDashboardMap[user.role];

      if (dashboard) {
        navigate(dashboard, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (formData) => {
    const { email, password } = formData;

    setError(null);

    try {
      const result = await login(email, password);

      if (result.success) {
        const dashboard = roleDashboardMap[result.data.user.role];

        if (dashboard) {
          navigate(dashboard, { replace: true });
        } else {
          setError("No dashboard found for this user role.");
        }
      } else {
        setError(result.error || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text text-center mb-2">
        Welcome Back
      </h1>

      <p className="text-muted text-center mb-6">
        Sign in to your AgriTrust account
      </p>

      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />

      <p className="text-center text-sm text-muted mt-4">
        Don't have an account?{" "}
        <Link
          to={ROUTES.REGISTER}
          className="text-primary hover:text-primary/80"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
