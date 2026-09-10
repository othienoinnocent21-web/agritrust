import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "../common/Input";

const PasswordInput = ({
  label = "Password",
  name = "password",
  value = "",
  onChange,
  error,
  placeholder = "Enter your password",
  required = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={className}>
      <div className="relative">
        <Input
          label={label}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          error={error}
          placeholder={placeholder}
          required={required}
          inputClassName="pr-10"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 mt-[2px] p-1 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 text-muted" />
          ) : (
            <Eye className="w-4 h-4 text-muted" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
