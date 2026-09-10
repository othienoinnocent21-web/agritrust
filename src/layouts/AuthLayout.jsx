import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary">AgriTrust</h1>
            <p className="text-sm text-muted mt-1">
              Building Trust in Agricultural Trade
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
