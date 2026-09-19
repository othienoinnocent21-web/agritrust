import PublicLayout from "../../layouts/PublicLayout";
import AuthLayout from "../../layouts/AuthLayout";
import DashboardLayout from "../../layouts/DashboardLayout";
import AdminLayout from "../../layouts/AdminLayout";

const Layouts = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-text mb-6">Layout Showcase</h1>
          <p className="text-muted mb-8">
            Preview of all application layouts used in AgriTrust routing.
          </p>
        </div>

        <div className="space-y-8">
          <div className="border border-border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-text mb-3">PublicLayout</h2>
            <div className="text-sm text-muted">
              Used for: Home, About, How It Works, Marketplace, Contact, FAQ, Privacy, Terms
            </div>
            <PublicLayout />
          </div>

          <div className="border border-border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-text mb-3">AuthLayout</h2>
            <div className="text-sm text-muted mb-2">
              Used for: Login, Register, Forgot Password, Reset Password, Verify Account
            </div>
            <AuthLayout />
          </div>

          <div className="border border-border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-text mb-3">DashboardLayout</h2>
            <div className="text-sm text-muted">
              Used for: Farmer and Buyer protected routes
            </div>
            <DashboardLayout />
          </div>

          <div className="border border-border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-text mb-3">AdminLayout</h2>
            <div className="text-sm text-muted">
              Used for: Admin protected routes
            </div>
            <AdminLayout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layouts;
