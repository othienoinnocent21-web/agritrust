import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import PasswordInput from "./PasswordInput";
import RoleSelector from "./RoleSelector";
import { validateEmail, validatePassword, validateRequired } from "../../utils/validators";

const AuthForm = ({
  mode = "login",
  onSubmit,
  loading = false,
  error,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const isRegister = mode === "register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setErrors((prev) => ({ ...prev, role: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const emailCheck = validateEmail(formData.email);
    if (!emailCheck.valid) newErrors.email = emailCheck.message;

    const passwordCheck = validatePassword(formData.password);
    if (!passwordCheck.valid) newErrors.password = passwordCheck.message;

    if (isRegister) {
      const nameCheck = validateRequired(formData.name, "Name");
      if (!nameCheck.valid) newErrors.name = nameCheck.message;

      if (!formData.role) {
        newErrors.role = "Please select a role";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {isRegister && (
        <Input
          label="Full Name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
      )}

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <PasswordInput
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      {isRegister && (
        <>
          <RoleSelector
            selectedRole={formData.role}
            onSelect={handleRoleSelect}
          />
          {errors.role && <span className="text-sm text-red-500">{errors.role}</span>}
        </>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={loading}
        className="mt-6"
      >
        {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
      </Button>
    </form>
  );
};

export default AuthForm;
