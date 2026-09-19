import { ROLES } from "../../constants";

const RoleSelector = ({
  selectedRole = "",
  onSelect,
  className = "",
}) => {
  const roles = [
    { value: ROLES.FARMER, label: "Farmer", description: "Sell your produce directly to buyers." },
    { value: ROLES.BUYER, label: "Buyer", description: "Buy fresh produce directly from farmers." },
  ];

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {roles.map((role) => (
        <button
          key={role.value}
          type="button"
          onClick={() => onSelect && onSelect(role.value)}
          className={`flex items-start gap-3 p-3 border rounded-lg text-left transition-all ${
            selectedRole === role.value
              ? "border-primary bg-primary/5 ring-1 ring-primary"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center ${
              selectedRole === role.value
                ? "border-primary bg-primary"
                : "border-muted-foreground"
            }`}
          >
            {selectedRole === role.value && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
          <div>
            <p className="font-medium text-text">{role.label}</p>
            <p className="text-sm text-muted">{role.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;
