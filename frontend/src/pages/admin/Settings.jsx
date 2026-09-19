import { useState } from "react";
import { Save, Globe, Phone, Mail, Shield, ToggleLeft, ToggleRight } from "lucide-react";
import Select from "../../components/common/Select";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const tabs = [
  { label: "General & Branding", value: "general" },
  { label: "Payment Gateways & Escrow", value: "payment" },
  { label: "Verification Standards", value: "verification" },
  { label: "Admin Roles & Permissions", value: "roles" },
  { label: "Security & API Keys", value: "security" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    siteTitle: "AgriTrust Uganda",
    supportEmail: "support@agritrust.com",
    supportPhone: "+256 700 000 000",
    currency: "UGX",
    timezone: "Africa/Kampala",
    language: "en",
    maintenanceMode: false,
    maintenanceMessage: "Platform is undergoing scheduled maintenance. Please try again later.",
  });
  const [dirty, setDirty] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    setDirty(false);
  };

  const handleDiscard = () => {
    setDirty(false);
  };

  const toggleMaintenance = () => {
    handleChange("maintenanceMode", !formData.maintenanceMode);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-2">Admin Settings</h1>
      <p className="text-muted mb-6">
        Configure platform-wide settings, branding, payment gateways, and security.
      </p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="flex flex-wrap border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setActiveTab(tab.value);
                setDirty(false);
              }}
              className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.value
                  ? "border-emerald-600 text-emerald-700 font-semibold"
                  : "border-transparent text-muted hover:text-text hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text mb-1">General & Branding</h3>
                <p className="text-sm text-muted">
                  Update site identity, support contact, and localization defaults.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Site Title"
                  value={formData.siteTitle}
                  onChange={(e) => handleChange("siteTitle", e.target.value)}
                />
                <Input
                  label="Support Email"
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => handleChange("supportEmail", e.target.value)}
                  leftIcon={Mail}
                />
                <Input
                  label="Support Helpline Phone"
                  value={formData.supportPhone}
                  onChange={(e) => handleChange("supportPhone", e.target.value)}
                  leftIcon={Phone}
                />
                <Select
                  label="Default Currency"
                  value={formData.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  options={[
                    { value: "UGX", label: "Ugandan Shilling (UGX)" },
                    { value: "USD", label: "US Dollar (USD)" },
                    { value: "EUR", label: "Euro (EUR)" },
                  ]}
                />
                <Select
                  label="Default Timezone"
                  value={formData.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  options={[
                    { value: "Africa/Kampala", label: "Africa/Kampala (EAT)" },
                    { value: "Africa/Nairobi", label: "Africa/Nairobi (EAT)" },
                    { value: "UTC", label: "UTC" },
                  ]}
                />
                <Select
                  label="Default Language"
                  value={formData.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                  options={[
                    { value: "en", label: "English" },
                    { value: "sw", label: "Swahili" },
                    { value: "lug", label: "Luganda" },
                  ]}
                />
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-emerald-700" />
                      <h4 className="font-semibold text-text">Platform Maintenance Mode</h4>
                    </div>
                    <p className="text-sm text-muted mt-1">
                      When enabled, the platform displays a maintenance message to all non-admin users.
                    </p>
                    {formData.maintenanceMode && (
                      <Input
                        label="Maintenance Message"
                        value={formData.maintenanceMessage}
                        onChange={(e) => handleChange("maintenanceMessage", e.target.value)}
                        className="mt-3"
                      />
                    )}
                  </div>
                  <button
                    onClick={toggleMaintenance}
                    className={`p-1 rounded-lg transition-colors ${
                      formData.maintenanceMode
                        ? "text-emerald-700 hover:bg-emerald-50"
                        : "text-muted hover:bg-gray-200"
                    }`}
                    aria-label="Toggle maintenance mode"
                  >
                    {formData.maintenanceMode ? (
                      <ToggleRight className="w-10 h-6" />
                    ) : (
                      <ToggleLeft className="w-10 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "general" && (
            <div className="text-center py-12">
              <Shield className="w-10 h-10 text-muted mx-auto mb-2" />
              <p className="text-muted">
                This section is under construction. Check back for updates.
              </p>
            </div>
          )}
        </div>
      </div>

      {dirty && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-40">
          <div className="container mx-auto px-6 py-3 flex items-center justify-between">
            <p className="text-sm text-muted">
              You have unsaved changes.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleDiscard}>
                Discard Changes
              </Button>
              <Button variant="primary" leftIcon={Save} onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;